import { readList } from '@/utils'

interface State {
	grid: number[][]
	amountOfFlashes: number
}

const getGridFromList = (list: string[]) => {
	return list.map((row) => row.split('').map(Number))
}

const getFlashingState = (list: string[]) => {
	let state: State = {
		grid: getGridFromList(list),
		amountOfFlashes: 0,
	}

	for (let i = 0; i < 100; i++) {
		state = reducer(state)
	}

	return state
}

const reducer = (state: State) => {
	let amountOfFlashes = 0

	state.grid.forEach((row, rowIndex) => {
		row.forEach((_, octopusIndex) => {
			amountOfFlashes += getAmountOfFlashesForOctopus(state, rowIndex, octopusIndex)
		})
	})

	state.grid.forEach((row, rowIndex) => {
		row.forEach((octopus, octopusIndex) => {
			if (octopus > 9) {
				state.grid[rowIndex][octopusIndex] = 0
			}
		})
	})

	return {
		grid: state.grid,
		amountOfFlashes: state.amountOfFlashes + amountOfFlashes,
	}
}

const getAmountOfFlashesForOctopus = (state: State, rowIndex: number, octopusIndex: number): number => {
	const octopus = state.grid[rowIndex][octopusIndex]
	const newValue = getNewValue(octopus)

	state.grid[rowIndex][octopusIndex] = newValue

	const adjacentDiagonalOctopuses = newValue === 10 ? getAdjacentDiagonalOctopuses(rowIndex, octopusIndex) : []
	let amountOfFlashes =
		newValue === 10
			? 1 +
			  adjacentDiagonalOctopuses.reduce(
					(total, [rowIndex, octopusIndex]) => total + getAmountOfFlashesForOctopus(state, rowIndex, octopusIndex),
					0,
			  )
			: 0

	return amountOfFlashes
}

const getAdjacentDiagonalOctopuses = (rowIndex: number, octopusIndex: number) => {
	return [
		...(rowIndex !== 0
			? [
					...(octopusIndex !== 0 ? [[rowIndex - 1, octopusIndex - 1]] : []),
					[rowIndex - 1, octopusIndex],
					...(octopusIndex !== 9 ? [[rowIndex - 1, octopusIndex + 1]] : []),
			  ]
			: []),

		...(octopusIndex !== 0 ? [[rowIndex, octopusIndex - 1]] : []),
		...(octopusIndex !== 9 ? [[rowIndex, octopusIndex + 1]] : []),

		...(rowIndex !== 9
			? [
					...(octopusIndex !== 0 ? [[rowIndex + 1, octopusIndex - 1]] : []),
					[rowIndex + 1, octopusIndex],
					...(octopusIndex !== 9 ? [[rowIndex + 1, octopusIndex + 1]] : []),
			  ]
			: []),
	]
}

const getNewValue = (octopus: number) => octopus + 1

const run = async () => {
	const list = await readList('11.txt')
	console.log(`The answer for 11a is: ${getFlashingState(list).amountOfFlashes}`)
}

run()
