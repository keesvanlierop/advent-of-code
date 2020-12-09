export const multiply = (numbers: number[]) => {
	return numbers.reduce((acc, number) => acc * number, 1)
}

export const add = (numbers: number[]) => {
	return numbers.reduce((acc, number) => acc + number, 0)
}

export const getNumbersThatAddUpTo = (
	numbers: number[],
	expectedresult: number,
	amountOfAdditionsIsUnkonwn = false,
) => {
	if (!amountOfAdditionsIsUnkonwn) {
		return numbers.filter((number1, index, self) =>
			self.some(
				(number2, index2) =>
					// Don't compare if number1 is the same index as number2
					index !== index2 &&
					// Match if number1 or number2 equals 2020
					number1 + number2 === expectedresult,
			),
		)
	}

	return (
		numbers
			.map((number1, index) => {
				let result = 0
				let startIndex = index + 1

				while (result < expectedresult) {
					result += numbers[startIndex]
					startIndex++
				}

				return {
					result,
					usedNumbers: numbers.slice(index, startIndex),
				}
			})
			.find((sets) => sets.result === expectedresult)?.usedNumbers || []
	)
}
