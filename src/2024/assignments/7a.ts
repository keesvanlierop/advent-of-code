import { add, multiply, readList } from '@/utils'

enum Operator {
	ADD = 'add',
	MUL = 'mul',
}
const operators = [Operator.ADD, Operator.MUL]

const generateOperators = (length: number): Operator[][] => {
	if (length === 0) return [[]]
	return generateOperators(length - 1).flatMap((combination) => operators.map((operator) => [...combination, operator]))
}

const isValidCalibration = (calibration: { result: number; numbers: number[] }) => {
	const { result, numbers } = calibration

	const operatorCombinations = generateOperators(numbers.length - 1)

	for (const operators of operatorCombinations) {
		let total = numbers[0]

		for (let i = 0; i < operators.length; i++) {
			const operator = operators[i]
			const nextNum = numbers[i + 1]

			if (operator === Operator.ADD) {
				total += nextNum
			} else {
				total *= nextNum
			}
		}

		if (total === result) {
			return true
		}
	}

	return false
}

const run = async () => {
	const list = await readList('7.txt')
	const calibrations = list.map((line) => {
		const [result, numbers] = line.split(':')
		return { result: Number(result), numbers: numbers.split(' ').filter(Boolean).map(Number) }
	})

	const validCalibrations = calibrations.filter(isValidCalibration).map((calibration) => calibration.result)

	console.log(`The answer for 7a is: ${add(validCalibrations || [])}`)
}

run()
