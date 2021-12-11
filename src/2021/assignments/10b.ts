import { readList } from '@/utils'

const startCharacters = ['[', '(', '{', '<']
const closingCharacters = [']', ')', '}', '>']

const scoreMap = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4,
}

const getUnclosedCharacters = (list: string[]) => {
	return list
		.reduce<(keyof typeof scoreMap)[][]>((illegalCharacters, sequence) => {
			const split = sequence.split('')

			let expectedClosingCharacters: string[] = []
			let incorrectClosingCharacter: string = ''

			split.forEach((s) => {
				if (startCharacters.includes(s)) {
					expectedClosingCharacters.unshift(closingCharacters[startCharacters.indexOf(s)])
				} else if (
					expectedClosingCharacters.length &&
					!incorrectClosingCharacter &&
					expectedClosingCharacters.splice(0, 1)[0] !== s
				) {
					incorrectClosingCharacter = s
				}
			})

			return [...illegalCharacters, incorrectClosingCharacter ? [] : (expectedClosingCharacters as (keyof typeof scoreMap)[])]
		}, [])
		.filter((characters) => characters.length)
}

const run = async () => {
	const list = await readList('10.txt')

	const illegalCharacters = getUnclosedCharacters(list)
	const score = illegalCharacters
		.map((characters) => characters.reduce((total, character) => total * 5 + scoreMap[character], 0))
		.sort((a, b) => a - b)[Math.floor(illegalCharacters.length / 2)]

	console.log(
		illegalCharacters
			.map((characters) => characters.reduce((total, character) => total * 5 + scoreMap[character], 0))
			.sort((a, b) => a - b),
	)

	console.log(`The answer for 10b is: ${score}`)
}

run()
