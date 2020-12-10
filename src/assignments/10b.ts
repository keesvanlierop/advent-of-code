import { getNumbersThatAddUpTo, multiply, readList, run } from '@/utils'

const startOutlet = 0
const deviceBuiltInAdapater = (numbers: number[]) => Math.max(...numbers) + 3

const distinctArrangements = new Map<number, number>()

const getPathsForNumber = (number: number) => {
	return [number + 1, number + 2, number + 3].reduce(
		(totalAmountOfPaths, number) => {
			return totalAmountOfPaths + (distinctArrangements.get(number) || 0)
		},
		0,
	)
}

const gitDistinctArrangements = async () => {
	const list = await readList('10.txt')

	const numbers = list.map(Number).sort((a, b) => b - a)
	const endOutlet = deviceBuiltInAdapater(numbers)

	distinctArrangements.set(endOutlet, 1)

	numbers.forEach((number) => {
		distinctArrangements.set(number, getPathsForNumber(number))
	})

	console.log(distinctArrangements)

	return getPathsForNumber(0)
}

run('10b', gitDistinctArrangements)
