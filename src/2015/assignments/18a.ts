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

const getLightsState = (map: string[]) => {
	let state = defaultState

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (map[y][x] === '#') {
				defaultState[`${x},${y}`] = true
			}
		}
	}

	for (let step = 0; step < 100; step++) {
		state = animate(state, map)
	}

	return state
}

const animate = (state: typeof defaultState, map: string[]) => {
	const cachedState: typeof defaultState = {}

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			const adjacentPoints = [
				state[`${x - 1},${y - 1}`],
				state[`${x},${y - 1}`],
				state[`${x + 1},${y - 1}`],
				state[`${x - 1},${y}`],
				state[`${x + 1},${y}`],
				state[`${x - 1},${y + 1}`],
				state[`${x},${y + 1}`],
				state[`${x + 1},${y + 1}`],
			].filter(Boolean)

			if (state[`${x},${y}`]) {
				if (adjacentPoints.length === 2 || adjacentPoints.length === 3) {
					cachedState[`${x},${y}`] = true
				}
			} else {
				if (adjacentPoints.length === 3) {
					cachedState[`${x},${y}`] = true
				}
			}
		}
	}

	return cachedState
}

const run = async () => {
	const list = await readList('18.txt', '2015')

	const lightsState = getLightsState(list)

	console.log(`The answer for 18a is: ${Object.keys(lightsState).length}`)
}

run()
