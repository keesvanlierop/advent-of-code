import { readList } from '@/utils'

enum CommandType {
	TURN_ON = 'turn on ',
	TURN_OFF = 'turn off ',
	TOGGLE = 'toggle ',
}

interface Command {
	type: CommandType
	coordinates: {
		start: [number, number]
		end: [number, number]
	}
}

const defaultState: Record<string, true> = {}

const getLightsState = (commands: string[]) => {
	return commands
		.map((command) => {
			const [, commandType, rest] = command.split(/(turn on |turn off |toggle )/)
			const [start, end] = rest.split(' through ')

			return {
				type: commandType as CommandType,
				coordinates: {
					start: start.split(',').map(Number) as [number, number],
					end: end.split(',').map(Number) as [number, number],
				},
			}
		})
		.reduce(reducer, defaultState)
}

const reducer = (state: typeof defaultState, command: Command) => {
	for (let x = command.coordinates.start[0]; x <= command.coordinates.end[0]; x++) {
		for (let y = command.coordinates.start[1]; y <= command.coordinates.end[1]; y++) {
			const coordinatesKey = `${x},${y}`
			switch (command.type) {
				case CommandType.TURN_ON: {
					state[coordinatesKey] = true
					break
				}
				case CommandType.TURN_OFF: {
					delete state[coordinatesKey]
					break
				}
				case CommandType.TOGGLE: {
					if (state[coordinatesKey]) {
						delete state[coordinatesKey]
					} else {
						state[coordinatesKey] = true
					}
					break
				}
			}
		}
	}

	return state
}

const run = async () => {
	const list = await readList('6.txt', '2015')

	const lightsState = getLightsState(list)

	console.log(`The answer for 6a is: ${Object.keys(lightsState).length}`)
}

run()
