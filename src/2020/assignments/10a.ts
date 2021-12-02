import { getNumbersThatAddUpTo, multiply, readList, run } from '@/utils'

const differences: Record<number, number> = {}

const getDifferencesForNumber = (
	numbers: number[],
	startingOutlet: number,
): void => {
	const nextAdapters = numbers.filter(
		(n) => n > startingOutlet && n <= startingOutlet + 3,
	)

	console.log('startingOutlet', startingOutlet)
	console.log('nextAdapters', nextAdapters)

	if (!nextAdapters.length) {
		return
	}

	let startDif = startingOutlet

	nextAdapters.forEach((nextAdapter, index) => {
		const difference = nextAdapter - startDif

		console.log(
			`The difference between "${nextAdapter}" and "${startDif}" = ${difference}`,
		)

		startDif = nextAdapter

		differences[difference] = (differences[difference] || 0) + 1

		if (index === nextAdapters.length - 1) {
			getDifferencesForNumber(numbers, Math.max(...nextAdapters))
		}
	})
}

const getJoltDifferences = async () => {
	const list = await readList('10.txt')

	const startingOutlet = 0
	const deviceBuiltInAdapater = (numbers: number[]) =>
		Math.max(...numbers) + 3
	const sortedNumbers = list.map(Number).sort((a, b) => a - b)
	const numbers = [...sortedNumbers, deviceBuiltInAdapater(sortedNumbers)]

	getDifferencesForNumber(numbers, startingOutlet)

	console.log('differences', differences)

	return multiply([differences[1], differences[3]])
}

run('10a', getJoltDifferences)
