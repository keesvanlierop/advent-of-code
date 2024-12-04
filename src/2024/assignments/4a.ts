import { readList } from '@/utils'

const run = async () => {
	const grid = await readList('4.txt')

	let total = 0

	const word = 'XMAS'

	type Direction = 0 | 1 | -1
	type DirectionCoordinate = [Direction, Direction]
	const directions: DirectionCoordinate[] = [
		[0, 1],
		[1, 0],
		[1, 1],
		[1, -1],
		[0, -1],
		[-1, 0],
		[-1, -1],
		[-1, 1],
	]

	const search = (x: number, y: number, direction?: DirectionCoordinate, index: number = 0): boolean => {
		if (index === word.length) {
			total++
			return true
		}
		if (!grid[y]?.[x] || grid[y][x] !== word[index]) return false

		const chosenDirection = direction ? [direction] : directions

		for (const [dx, dy] of chosenDirection) {
			search(x + dx, y + dy, [dx, dy], index + 1)
		}

		return false
	}

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			search(x, y)
		}
	}

	console.log(`The answer for 4a is: ${total}`)
}

run()
