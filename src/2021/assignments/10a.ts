import { readList } from '@/utils'

const startCharacters = ['[', '(', '{', '<']
const closingCharacters = [']', ')', '}', '>']

const scoreMap = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
}

const getIllegalCharacters = (list: string[]) => {
	return list.reduce<(keyof typeof scoreMap)[]>((illegalCharacters, sequence) => {
		const split = sequence.split('')

		let expectedClosingCharacters: string[] = []
		let incorrectClosingCharacter: string

		split.forEach((s) => {
			if (startCharacters.includes(s)) {
				expectedClosingCharacters.unshift(closingCharacters[startCharacters.indexOf(s)])
			} else if (expectedClosingCharacters.length && !incorrectClosingCharacter && expectedClosingCharacters.splice(0, 1)[0] !== s) {
				incorrectClosingCharacter = s
				illegalCharacters.push(s as keyof typeof scoreMap)
			}
		})

		return illegalCharacters
	}, [])
}

const run = async () => {
	const list = await readList('10.txt')

	const illegalCharacters = getIllegalCharacters(list)
	const score = illegalCharacters.reduce((total, character) => total + scoreMap[character], 0)

	console.log(`The answer for 10a is: ${score}`)
}

run()
