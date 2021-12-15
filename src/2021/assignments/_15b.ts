import { dijkstra, readList } from '@/utils'

const run = async () => {
	const list = await readList('15.dummy.txt')
	const grid = list.map((item) => item.split('').map(Number))
	let graph: Record<string, Record<string, number>> = {}

	const height = grid.length
	const width = grid[0].length

	const getValueForXY = (x: number, y: number, i: number, i2: number) => {
		const newValue = grid[y % height][x % width] + 1 * (i + i2)
		return newValue > 9 ? newValue - 9 : newValue
	}

	for (let i = 0; i < 5; i++) {
		for (let y = 0 + height * i; y < height + height * i; y++) {
			for (let i2 = 0; i2 < 5; i2++) {
				for (let x = 0 + width * i2; x < width + width * i2; x++) {
					graph[x + ',' + y] = {
						...(y !== 0 ? { [x + ',' + (y - 1)]: getValueForXY(x, y - 1, i, i2) } : {}),
						...(y !== 499 ? { [x + ',' + (y + 1)]: getValueForXY(x, y + 1, i, i2) } : {}),
						...(x !== 0 ? { [x - 1 + ',' + y]: getValueForXY(x - 1, y, i, i2) } : {}),
						...(x !== 499 ? { [x + 1 + ',' + y]: getValueForXY(x + 1, y, i, i2) } : {}),
					}
				}
			}
		}
	}

	console.log(graph)

	const path = dijkstra.find_path(graph, '0,0', grid.length - 1 + ',' + (grid[0].length - 1))

	const riskValue = path
		.map((coordinates) => coordinates.split(','))
		.map(([x, y]) => grid[y][x])
		.reduce((total, amount) => total + amount, 0)

	console.log(`The answer for 15b is: ${riskValue - grid[0][0]}`)
}

run()
