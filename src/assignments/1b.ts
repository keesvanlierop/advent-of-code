import { multiply, readList } from '@/utils'

const expectedResult = 2020
const amountOfNumbers = 3

const compare = (
	list: number[],
	indexA: number,
	acc: number,
	amountOfNumbers: number,
): boolean => {
	const uniqueList = list.filter((_, indexB) => indexA !== indexB)

	return uniqueList.some((numberB, indexB) =>
		amountOfNumbers
			? compare(uniqueList, indexB, acc + numberB, amountOfNumbers - 1)
			: acc + numberB === expectedResult,
	)
}

const getNumbersThatAddUpToExpectedResult = (
	list: number[],
	amountOfNumbers: number,
) => {
	return list.filter((number1, index, self) =>
		compare(self, index, number1, amountOfNumbers - 2),
	)
}

const run = async () => {
	const list = await readList('1.txt')

	const numbers = list.map(Number)
	const numbersThatAddUpTo2020 = getNumbersThatAddUpToExpectedResult(
		numbers,
		amountOfNumbers,
	)

	console.log(
		`The numbers that add up to ${expectedResult}: ${numbersThatAddUpTo2020}`,
	)

	const numbersMultiplied = multiply(numbersThatAddUpTo2020)

	console.log(`The answer for 1b is: ${numbersMultiplied}`)
}

run()
