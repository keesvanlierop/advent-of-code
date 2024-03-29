import { multiply, readList } from '@/utils'

enum CommandType {
	FORWARD = 'forward',
	DOWN = 'down',
	UP = 'up',
}

const defaultState = {
	horizontalPosition: 0,
	depth: 0,
}

const positionReducer = (
	state: typeof defaultState,
	command: readonly [CommandType, number],
) => {
	switch (command[0]) {
		case CommandType.FORWARD:
			return {
				...state,
				horizontalPosition: state.horizontalPosition + command[1],
			}
		case CommandType.DOWN:
			return { ...state, depth: state.depth + command[1] }
		case CommandType.UP:
			return { ...state, depth: state.depth - command[1] }
	}
}

const getPositionInfo = (commands: string[]) => {
	const commandsSplit = commands.map((command) => {
		const split = command.split(' ')
		return [split[0] as CommandType, Number(split[1])] as const
	})

	return commandsSplit.reduce(positionReducer, defaultState)
}

const run = async () => {
	const commands = await readList('2.txt')

	const position = getPositionInfo(commands)

	console.log(
		`The answer for 2a is: ${position.horizontalPosition * position.depth}`,
	)
}

run()
