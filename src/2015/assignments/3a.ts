import { readList } from '@/utils'

enum Direction {
	NORTH = '^',
	WEST = '<',
	EAST = '>',
	SOUTH = 'v',
}

const startLocation: [number, number] = [0, 0]
const defaultState = {
	current: startLocation,
	visitedHouses: [startLocation],
}

const getPresentsState = (directions: Direction[]) => {
	return directions.reduce(directionsReducer, defaultState)
}

const directionsReducer = (state: typeof defaultState, direction: Direction) => {
	switch (direction) {
		case Direction.NORTH: {
			const current = [state.current[0], state.current[1] - 1] as const
			return getNewStateForCurrentPosition(state, current)
		}
		case Direction.WEST: {
			const current = [state.current[0] - 1, state.current[1]] as const
			return getNewStateForCurrentPosition(state, current)
		}
		case Direction.EAST: {
			const current = [state.current[0] + 1, state.current[1]] as const
			return getNewStateForCurrentPosition(state, current)
		}
		case Direction.SOUTH: {
			const current = [state.current[0], state.current[1] + 1] as const
			return getNewStateForCurrentPosition(state, current)
		}
	}
}

const getNewStateForCurrentPosition = (state: typeof defaultState, current: readonly [number, number]) => {
	const visitedHouses = state.visitedHouses.find((house) => house[0] === current[0] && house[1] === current[1])
		? state.visitedHouses
		: [...state.visitedHouses, current]

	return {
		current,
		visitedHouses,
	} as typeof defaultState
}

const run = async () => {
	const list = await readList('3.txt', '2015')

	const presentsState = getPresentsState(list[0].split('') as Direction[])

	console.log(`The answer for 3a is: ${presentsState.visitedHouses.length}`)
}

run()
