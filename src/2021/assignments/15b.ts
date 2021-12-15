import { dijkstra, readList } from '@/utils'

const run = async () => {
	const list = await readList('15.txt')
	const grid = list.map((item) => item.split('').map(Number))

	const height = grid.length
	const width = grid[0].length

	for (let i = 0; i < 5; i++) {
		for (let y = 0 + height * i; y < height + height * i; y++) {
			if (!grid[y]) grid[y] = []

			for (let i2 = 0; i2 < 5; i2++) {
				for (let x = 0 + width * i2; x < width + width * i2; x++) {
					const newValue = grid[y % height][x % width] + 1 * (i + i2)
					grid[y][x] = newValue > 9 ? newValue - 9 : newValue
				}
			}
		}
	}

	const graph = grid.reduce(
		(map, x, y) => ({
			...map,
			...x.reduce(
				(map, risk, x) => ({
					...map,
					[x + ',' + y]: {
						...(grid[y - 1]?.[x] ? { [x + ',' + (y - 1)]: grid[y - 1]?.[x] } : {}),
						...(grid[y + 1]?.[x] ? { [x + ',' + (y + 1)]: grid[y + 1]?.[x] } : {}),
						...(grid[y]?.[x - 1] ? { [x - 1 + ',' + y]: grid[y]?.[x - 1] } : {}),
						...(grid[y]?.[x + 1] ? { [x + 1 + ',' + y]: grid[y]?.[x + 1] } : {}),
					},
				}),
				{},
			),
		}),
		{},
	)

	const path = dijkstra.find_path(graph, '0,0', grid.length - 1 + ',' + (grid[0].length - 1))

	const riskValue = path
		.map((coordinates) => coordinates.split(','))
		.map(([x, y]) => grid[y][x])
		.reduce((total, amount) => total + amount, 0)

	console.log(`The answer for 15b is: ${riskValue - grid[0][0]}`)
}

run()
