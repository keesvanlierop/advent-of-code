import { readList } from '@/utils'

enum BitwiseOperator {
	NOT = 'NOT',
	OR = 'OR',
	LSHIFT = 'LSHIFT',
	AND = 'AND',
	RSHIFT = 'RSHIFT',
}

interface RightHandSideOperation {
	rightHandSide: string
	assignment: string
}

interface LeftHandSideOperation extends RightHandSideOperation {
	leftHandSide: string
}
interface BitwiseAndOperation extends LeftHandSideOperation {
	operator: BitwiseOperator.AND
}
interface BitwiseOrOperation extends LeftHandSideOperation {
	operator: BitwiseOperator.OR
}
interface BitwiseLShiftOperation extends LeftHandSideOperation {
	operator: BitwiseOperator.LSHIFT
}
interface BitwiseRShiftOperation extends LeftHandSideOperation {
	operator: BitwiseOperator.RSHIFT
}
interface BitwiseNotOperation extends RightHandSideOperation {
	operator: BitwiseOperator.NOT
}
interface AssignOperation extends LeftHandSideOperation {
	operator: 'ASSIGN'
}
type Command =
	| BitwiseAndOperation
	| BitwiseOrOperation
	| BitwiseLShiftOperation
	| BitwiseRShiftOperation
	| BitwiseNotOperation
	| AssignOperation

const defaultState: Record<string, number> = {}

const getWiresState = (commands: string[]) => {
	return commands
		.map(
			(command): Command => {
				const [equation, assignment] = command.split(' -> ')
				const [leftHandSide, operator, rightHandSide] = equation.split(/(NOT|OR|LSHIFT|AND|RSHIFT)/)

				return {
					operator: (operator as BitwiseOperator) || 'ASSIGN',
					rightHandSide: rightHandSide?.replace(' ', ''),
					assignment,
					leftHandSide: leftHandSide?.replace(' ', ''),
				}
			},
		)
		.reduce(reducer, defaultState)

	// return reducer(state, {
	// 	operator: 'ASSIGN',
	// 	leftHandSide: String(state.a),
	// 	rightHandSide: '',
	// 	assignment: 'b',
	// })
}

const getValue = (value: string, state: typeof defaultState) => (isNaN(Number(value)) ? state[value] : Number(value))

const postponed: Record<string, Command[]> = {}
const postponeCommand = (command: Command) => {
	if ('leftHandSide' in command && typeof command.leftHandSide !== 'undefined' && isNaN(Number(command.leftHandSide))) {
		if (!postponed[command.leftHandSide]) {
			postponed[command.leftHandSide] = []
		}

		if (
			!postponed[command.leftHandSide].some(
				(c) =>
					c.operator === command.operator &&
					c.leftHandSide === command.leftHandSide &&
					c.rightHandSide === command.rightHandSide &&
					c.assignment === command.assignment,
			)
		)
			postponed[command.leftHandSide].push(command)
	}

	if ('rightHandSide' in command && typeof command.rightHandSide !== 'undefined' && isNaN(Number(command.rightHandSide))) {
		if (!postponed[command.rightHandSide]) {
			postponed[command.rightHandSide] = []
		}

		if (
			!postponed[command.rightHandSide].some(
				(c) =>
					c.operator === command.operator &&
					c.rightHandSide === command.rightHandSide &&
					// @ts-ignore
					c.leftHandSide! === command.leftHandSide! &&
					c.assignment === command.assignment,
			)
		)
			postponed[command.rightHandSide].push(command)
	}
}

const triggerPostponedCommands = (command: Command, state: typeof defaultState) => {
	if (postponed[command.assignment]) {
		const clone = [...postponed[command.assignment]]
		while (clone.length) {
			const postponedCommand = clone.shift()
			if (postponedCommand) state = reducer(state, postponedCommand)
		}
	}

	return state
}

const reducer = (state: typeof defaultState, command: Command) => {
	const left = 'leftHandSide' in command ? getValue(command.leftHandSide, state) : undefined
	const right = getValue(command.rightHandSide, state)

	switch (command.operator) {
		case BitwiseOperator.AND:
			if (typeof left !== 'undefined' && typeof right !== 'undefined') {
				state[command.assignment] = left & right
				state = triggerPostponedCommands(command, state)
			} else {
				postponeCommand(command)
			}
			break

		case BitwiseOperator.OR:
			if (typeof left !== 'undefined' && typeof right !== 'undefined') {
				state[command.assignment] = left | right
				state = triggerPostponedCommands(command, state)
			} else {
				postponeCommand(command)
			}
			break

		case BitwiseOperator.LSHIFT:
			if (typeof left !== 'undefined' && typeof right !== 'undefined') {
				state[command.assignment] = left << right
				state = triggerPostponedCommands(command, state)
			} else {
				postponeCommand(command)
			}
			break

		case BitwiseOperator.RSHIFT:
			if (typeof left !== 'undefined' && typeof right !== 'undefined') {
				state[command.assignment] = left >> right
				state = triggerPostponedCommands(command, state)
			} else {
				postponeCommand(command)
			}
			break

		case BitwiseOperator.NOT:
			if (typeof right !== 'undefined') {
				state[command.assignment] = ~right
				state = triggerPostponedCommands(command, state)
			} else {
				postponeCommand(command)
			}
			break

		case 'ASSIGN':
			if (typeof left !== 'undefined') {
				state[command.assignment] = left
				state = triggerPostponedCommands(command, state)
			} else {
				postponeCommand(command)
			}
			break
	}

	return state
}

const run = async () => {
	const list = await readList('7.txt', '2015')

	const wiresState = getWiresState(list)

	console.log(`The answer for 7a is: ${wiresState.a}`)
}

run()
