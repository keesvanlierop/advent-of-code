import { getNumbersThatAddUpTo, readList, run } from '@/utils'

const getFirstIncorrectNumberInSequence = async () => {
	const list = await readList('9.txt')

	const numbers = list.map(Number)
	const preamble = numbers.splice(0, 25)

	console.log('Starting preamble', preamble)
	console.log('Numbers', numbers)

	return numbers.find((number) => {
		console.log('checking number: ', number)

		const addsUpToExpectedResult = getNumbersThatAddUpTo(preamble, number)

		if (addsUpToExpectedResult.length) {
			preamble.shift()
			preamble.push(number)
		}

		return addsUpToExpectedResult.length === 0
	})
}

run('9a', getFirstIncorrectNumberInSequence)
