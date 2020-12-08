import { multiply, readList } from '@/utils'

const getNumbersToAddUpTo2020 = (list: number[]) => {
	return list.filter((number1, index, self) =>
		self.some(
			(number2, index2) =>
				// Don't compare if number1 is the same index as number2
				index !== index2 &&
				// Match if number1 or number2 equals 2020
				number1 + number2 === 2020,
		),
	)
}

const run = async () => {
	const list = await readList('1.txt')

	const numbers = list.map(Number)
	const numbersThatAddUpTo2020 = getNumbersToAddUpTo2020(numbers)

	console.log(`The numbers that add up to 2020: ${numbersThatAddUpTo2020}`)

	const numbersMultiplied = multiply(numbersThatAddUpTo2020)

	console.log(`The answer for 1a is: ${numbersMultiplied}`)
}

run()
