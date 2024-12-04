import { readList } from '@/utils'

const run = async () => {
	const grid = await readList('4.txt')

	let total = 0

	const registry = new Map<string, string>()

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			registry.set(`${x}-${y}`, grid[y][x])
		}
	}
	const directions = [
		[1, 1],
		[1, -1],
		[-1, -1],
		[-1, 1],
	]

	const isX = ([x, y]: number[]) => {
		const diagonals = directions.map(([dx, dy]) => [x + dx, y + dy])
		const diagonalChars = diagonals.map(([x, y]) => registry.get(`${x}-${y}`))

		// Has to be diagonally surrounded by two Ms and two Ss
		if ([...diagonalChars].sort().join('') !== 'MMSS') return false

		// The two Ms cannot be opposite of each other
		const [m1, m2] = diagonals.filter(([x, y]) => registry.get(`${x}-${y}`) === 'M')
		if (Math.abs(m1[0] - m2[0]) === 2 && Math.abs(m1[1] - m2[1]) === 2) {
			return false
		}

		return true
	}

	registry.forEach((value, key) => {
		if (value !== 'A') return

		if (isX(key.split('-').map(Number))) {
			total++
		}
	})

	console.log(`The answer for 4b is: ${total}`)
}

run()
