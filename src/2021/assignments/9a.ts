import { readList } from '@/utils'

const getLowPoints = (list: string[]) => {
	return list
		.map((sequence) => sequence.split('').map(Number))
		.map((row, rowIndex, rowArray) =>
			row.filter(
				(number, index) =>
					(typeof row[index - 1] !== 'number' || row[index - 1] > number) &&
					(typeof row[index + 1] !== 'number' || row[index + 1] > number) &&
					(typeof rowArray[rowIndex - 1]?.[index] !== 'number' || rowArray[rowIndex - 1]?.[index] > number) &&
					(typeof rowArray[rowIndex + 1]?.[index] !== 'number' || rowArray[rowIndex + 1]?.[index] > number),
			),
		)
}

const run = async () => {
	const list = await readList('9.txt')

	const lowPoints = getLowPoints(list)
	const allLowPoints = lowPoints.flat()

	console.log(`The answer for 9a is: ${allLowPoints.reduce((total, lowPoint) => total + lowPoint, 0) + allLowPoints.length}`)
}

run()
