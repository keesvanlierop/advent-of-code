import { add, multiply, readList } from '@/utils'

const run = async () => {
	const grid = await readList('10.txt')

	type Direction = 0 | 1 | -1
	type DirectionCoordinate = [Direction, Direction]
	const directions: DirectionCoordinate[] = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	]

	let validTrailheads: Record<string, Set<string>> = {}

	const detectValidTrailHeads = (startX: number, startY: number) => {
		const iterate = (x = startX, y = startY, current = 0) => {
			const isStart = x === startX && y === startY && current === 0
			const level = Number(grid[y]?.[x])
			if (!isStart && level !== current + 1) return

			if (level === 9) {
				if (!validTrailheads[`${startX}-${startY}`]) {
					validTrailheads[`${startX}-${startY}`] = new Set()
				}
				validTrailheads[`${startX}-${startY}`].add(`${x}-${y}`)
				return
			}

			directions.forEach(([dx, dy]) => {
				const nextX = x + dx
				const nextY = y + dy
				iterate(nextX, nextY, level)
			})
		}

		return iterate
	}

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === '0') {
				detectValidTrailHeads(x, y)()
			}
		}
	}

	console.log(validTrailheads)

	console.log(`The answer for 10a is: ${add(Object.values(validTrailheads).map((trailheads) => trailheads.size))}`)
}

run()
