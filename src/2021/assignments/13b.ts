import { readList } from '@/utils'

const state = {
	map: {
		width: 0,
		height: 0,
		coordinatesX: {} as Record<number, number[]>,
		coordinatesY: {} as Record<number, number[]>,
	},
	instructions: [] as [string, number][],
}

const getFoldState = (list: string[]) => {
	list.forEach((item) => {
		if (item.startsWith('fold along')) {
			const [, data] = item.split('fold along ')
			const [direction, position] = data.split('=')

			state.instructions.push([direction, Number(position)])
		} else if (item) {
			const [x, y] = item.split(',')

			if (!state.map.coordinatesX[Number(x)]) state.map.coordinatesX[Number(x)] = []
			state.map.coordinatesX[Number(x)].push(Number(y))

			if (!state.map.coordinatesY[Number(y)]) state.map.coordinatesY[Number(y)] = []
			state.map.coordinatesY[Number(y)].push(Number(x))
		}
	})

	recalculateMapSize()

	state.instructions.forEach(([direction, position]) => {
		if (direction === 'y') {
			Object.keys(state.map.coordinatesY)
				.map(Number)
				.filter((y) => y > position)
				.forEach((y) => {
					const foldedY = position - (y - position)
					state.map.coordinatesY[y].forEach((x) => {
						if (!state.map.coordinatesY[foldedY]) state.map.coordinatesY[foldedY] = []
						if (!state.map.coordinatesY[foldedY].includes(x)) state.map.coordinatesY[foldedY].push(x)

						if (!state.map.coordinatesX[x]) state.map.coordinatesX[x] = []
						if (!state.map.coordinatesX[x].includes(foldedY)) state.map.coordinatesX[x].push(foldedY)
					})
				})

			Object.keys(state.map.coordinatesY)
				.map(Number)
				.filter((y) => y > position)
				.forEach((y) => {
					delete state.map.coordinatesY[y]
				})

			Object.keys(state.map.coordinatesX).forEach((x) => {
				state.map.coordinatesX[Number(x)] = state.map.coordinatesX[Number(x)].filter((y) => y <= position)
			})

			state.map.height = position
		} else {
			Object.keys(state.map.coordinatesX)
				.map(Number)
				.filter((x) => x > position)
				.forEach((x) => {
					const foldedX = position - (x - position)
					state.map.coordinatesX[x].forEach((y) => {
						if (!state.map.coordinatesX[foldedX]) state.map.coordinatesX[foldedX] = []
						if (!state.map.coordinatesX[foldedX].includes(y)) state.map.coordinatesX[foldedX].push(y)

						if (!state.map.coordinatesY[y]) state.map.coordinatesY[y] = []
						if (!state.map.coordinatesY[y].includes(foldedX)) state.map.coordinatesY[y].push(foldedX)
					})
				})

			Object.keys(state.map.coordinatesX)
				.map(Number)
				.filter((x) => x > position)
				.forEach((x) => {
					delete state.map.coordinatesX[x]
				})

			Object.keys(state.map.coordinatesY).forEach((y) => {
				state.map.coordinatesY[Number(y)] = state.map.coordinatesY[Number(y)].filter((x) => x <= position)
			})

			state.map.width = position
		}
	})

	return state
}

const recalculateMapSize = () => {
	state.map.width = Math.max(...Object.keys(state.map.coordinatesX).map(Number))
	state.map.height = Math.max(...Object.keys(state.map.coordinatesY).map(Number))
}

const run = async () => {
	const list = await readList('13.txt')

	const state = getFoldState(list)

	const gridRow = [...Array(state.map.width).keys()].map((_) => '.')

	Object.values(state.map.coordinatesY)
		.map((x) => {
			const row = [...gridRow]
			x.forEach((x) => (row[x] = 'x'))
			return row
		})
		.forEach((row) => console.log(row.join('')))

	console.log(`The answer for 13b is: ${123}`)
}

run()
