import { chunk, readList } from '@/utils'

enum Direction {
	NORTH = '^',
	WEST = '<',
	EAST = '>',
	SOUTH = 'v',
}

interface Visitation {
	direction: Direction
	visitor: Visitor
}

type Visitor = 'santa' | 'robo'

const startLocation: [number, number] = [0, 0]
const defaultState = {
	current: {
		santa: startLocation,
		robo: startLocation,
	},
	visitedHouses: [startLocation],
}

const getPresentsState = (directions: Direction[]) => {
	return directions
		.map((direction, index) => ({
			visitor: (index % 2 === 1 ? 'santa' : 'robo') as Visitor,
			direction,
		}))
		.reduce(directionsReducer, defaultState)
}

const directionsReducer = (state: typeof defaultState, visitation: Visitation) => {
	const currentPositionForVisitor = state.current[visitation.visitor]
	const newCurrentPositionForVisitor = getCurrentPositionForDirection(currentPositionForVisitor, visitation.direction)

	const visitedHouses = state.visitedHouses.find(
		(house) => house[0] === newCurrentPositionForVisitor[0] && house[1] === newCurrentPositionForVisitor[1],
	)
		? state.visitedHouses
		: [...state.visitedHouses, newCurrentPositionForVisitor]

	return {
		...state,
		current: {
			...state.current,
			[visitation.visitor]: newCurrentPositionForVisitor,
		},
		visitedHouses,
	}
}

const getCurrentPositionForDirection = (current: [number, number], direction: Direction): [number, number] => {
	switch (direction) {
		case Direction.NORTH:
			return [current[0], current[1] - 1]
		case Direction.WEST:
			return [current[0] - 1, current[1]]
		case Direction.EAST:
			return [current[0] + 1, current[1]]
		case Direction.SOUTH:
			return [current[0], current[1] + 1]
	}
}

const run = async () => {
	const list = await readList('3.txt', '2015')

	const presentsState = getPresentsState(list[0].split('') as Direction[])

	console.log(`The answer for 3b is: ${presentsState.visitedHouses.length}`)
}

run()
