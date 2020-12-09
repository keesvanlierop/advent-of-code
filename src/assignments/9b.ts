import { getNumbersThatAddUpTo, readList, run } from '@/utils'

const getFirstIncorrectNumberInSequence = async () => {
	const list = await readList('9.txt')

	const allNumbers = list.map(Number)
	const numbers = list.map(Number)
	const preamble = numbers.splice(0, 25)

	const invalidNumber = numbers.find((number) => {
		const addsUpToExpectedResult = getNumbersThatAddUpTo(preamble, number)

		if (addsUpToExpectedResult.length) {
			preamble.shift()
			preamble.push(number)
		}

		return addsUpToExpectedResult.length === 0
	})
	if (!invalidNumber) throw new Error('Everythings fine')
	const invalidNumberIndex = allNumbers.findIndex((v) => v === invalidNumber)

	console.log('invalidNumber', invalidNumber)
	console.log('invalidNumberIndex', invalidNumberIndex)

	const allNumbersPreceedingInvalidNumber = allNumbers.slice(
		0,
		invalidNumberIndex,
	)
	const sequence = getNumbersThatAddUpTo(
		allNumbersPreceedingInvalidNumber,
		invalidNumber,
		true,
	)

	return Math.min(...sequence) + Math.max(...sequence)
}

run('9b', getFirstIncorrectNumberInSequence)
