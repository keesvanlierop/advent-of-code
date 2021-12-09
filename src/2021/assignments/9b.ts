import { flatten, readList } from '@/utils'

const getLowPoints = (rows: number[][]) => {
	return rows.map((row, rowIndex, rowArray) =>
		row
			.map((number, index) =>
				(typeof row[index - 1] !== 'number' || row[index - 1] > number) &&
				(typeof row[index + 1] !== 'number' || row[index + 1] > number) &&
				(typeof rowArray[rowIndex - 1]?.[index] !== 'number' || rowArray[rowIndex - 1]?.[index] > number) &&
				(typeof rowArray[rowIndex + 1]?.[index] !== 'number' || rowArray[rowIndex + 1]?.[index] > number)
					? index
					: undefined,
			)
			.filter((number): number is number => Boolean(number)),
	)
}

const getUpperLevels = (lowPointIndex: number, rowIndex: number, rows: number[][]): [number, number][] => {
	const lowPoint = rows[rowIndex][lowPointIndex]

	const adjacentLowPoints = [
		[rowIndex, lowPointIndex + 1],
		[rowIndex, lowPointIndex - 1],
		[rowIndex + 1, lowPointIndex],
		[rowIndex - 1, lowPointIndex],
	]
		.filter(
			([rowIndex, pointIndex]) =>
				typeof rows[rowIndex]?.[pointIndex] !== 'undefined' &&
				rows[rowIndex]?.[pointIndex] !== 9 &&
				rows[rowIndex]?.[pointIndex] > lowPoint,
		)
		.map(([rowIndex, pointIndex]) => getUpperLevels(pointIndex, rowIndex, rows))

	return [{ rowIndex, lowPointIndex }, ...flatten(adjacentLowPoints)].filter(
		(coordinates, index, self) =>
			self.findIndex((c) => c.rowIndex === coordinates.rowIndex && c.lowPointIndex === coordinates.lowPointIndex) === index,
	)
}

const getBasins = (lowPointRows: number[][], rows: number[][]) => {
	return lowPointRows.map((row, rowIndex) => row.map((lowPointIndex) => getUpperLevels(lowPointIndex, rowIndex, rows))).flat()
}

const run = async () => {
	const list = await readList('9.txt')

	const rows = list.map((sequence) => sequence.split('').map(Number))
	const lowPoints = getLowPoints(rows)
	const basins = getBasins(lowPoints, rows)
	const largestBasins = basins.sort((a, b) => b.length - a.length).slice(0, 3)

	console.log(`The answer for 9b is: ${largestBasins.reduce((total, basin) => total * basin.length, 1)}`)
}

run()
