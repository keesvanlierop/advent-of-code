import { readList } from '@/utils'

export interface PasswordValidation {
	indexA: number
	indexB: number
	letter: string
}

export interface PasswordRow {
	validation: PasswordValidation
	password: string
}

const getPasswordRows = (list: string[]): PasswordRow[] => {
	return list.map((item) => {
		const [rule, rawPassword] = item.split(':')
		const [amounts, letter] = rule.split(' ')
		const [indexA, indexB] = amounts.split('-')
		const password = rawPassword.replace(/ /g, '')

		return {
			validation: {
				indexA: Number(indexA),
				indexB: Number(indexB),
				letter,
			},
			password,
		}
	})
}

const isPasswordValid = ({ password, validation }: PasswordRow) => {
	const letterAtIndexA = password[validation.indexA - 1]
	const letterAtIndexB = password[validation.indexB - 1]

	return (
		(letterAtIndexB === validation.letter ||
			letterAtIndexA === validation.letter) &&
		letterAtIndexA !== letterAtIndexB
	)
}

const run = async () => {
	const list = await readList('2.txt')

	const passwordRows = getPasswordRows(list)
	const amountOfValidPassowrds = passwordRows.filter(isPasswordValid).length

	console.log(`The answer for 2b is: ${amountOfValidPassowrds}`)
}

run()
