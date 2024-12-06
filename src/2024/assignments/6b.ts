import { readList } from '@/utils'

const run = async () => {
	const grid = await readList('6.txt')

	let startCoordinates: [number, number] = [-1, -1]

	const dotCoordinates: [number, number][] = []

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === '^') startCoordinates = [x, y]
			if (grid[y][x] === '.') dotCoordinates.push([x, y])
		}
	}

	enum Direction {
		UP = '^',
		DOWN = 'v',
		LEFT = '<',
		RIGHT = '>',
	}

	const directionToCoordinate: Record<Direction, [number, number]> = {
		[Direction.UP]: [0, -1],
		[Direction.DOWN]: [0, 1],
		[Direction.LEFT]: [-1, 0],
		[Direction.RIGHT]: [1, 0],
	}

	const turnRight = (direction: Direction) => {
		if (direction === Direction.UP) return Direction.RIGHT
		else if (direction === Direction.RIGHT) return Direction.DOWN
		else if (direction === Direction.DOWN) return Direction.LEFT
		else return Direction.UP
	}

	const wouldGetStuckInLoop = (grid: string[][], startCoordinates: [number, number]) => {
		const distinctPositions: Record<string, Direction[]> = {}
		let direction: Direction = Direction.UP
		let isStuckInLoop = false

		let currentCoordinates = startCoordinates

		while (!isStuckInLoop && grid[currentCoordinates[1]]?.[currentCoordinates[0]]) {
			distinctPositions[`${currentCoordinates[0]}:${currentCoordinates[1]}`] = [
				...(distinctPositions[`${currentCoordinates[0]}:${currentCoordinates[1]}`] ?? []),
				direction,
			]

			const [dx, dy] = directionToCoordinate[direction]
			const nextCoordinates: [number, number] = [currentCoordinates[0] + dx, currentCoordinates[1] + dy]

			if (grid[nextCoordinates[1]]?.[nextCoordinates[0]] === '#') {
				direction = turnRight(direction)
			} else {
				if (distinctPositions[`${nextCoordinates[0]}:${nextCoordinates[1]}`]?.includes(direction)) {
					isStuckInLoop = true
				}
				currentCoordinates = nextCoordinates
			}
		}

		return isStuckInLoop
	}

	const obstaclePathsThatWouldGetStuckInLoop = dotCoordinates.filter((dotCoordinate) => {
		const clonedGrid = grid.map((row) => [...row.slice()])
		clonedGrid[dotCoordinate[1]][dotCoordinate[0]] = '#'

		const stuckInLoop = wouldGetStuckInLoop(clonedGrid, startCoordinates)
		if (stuckInLoop) console.log(`Stuck in loop with dot at ${dotCoordinate[0]}:${dotCoordinate[1]}`)
		return stuckInLoop
	})

	console.log(`The answer for 6b is: ${obstaclePathsThatWouldGetStuckInLoop.length}`)
}

run()
