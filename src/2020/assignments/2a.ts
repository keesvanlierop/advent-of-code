import { readList } from '@/utils'

export interface PasswordValidation {
	min: number
	max: number
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
		const [min, max] = amounts.split('-')
		const password = rawPassword.replace(/ /g, '')

		return {
			validation: {
				min: Number(min),
				max: Number(max),
				letter,
			},
			password,
		}
	})
}

const isPasswordValid = ({ password, validation }: PasswordRow) => {
	const amountOfOccurences =
		password.match(new RegExp(validation.letter, 'g'))?.length || 0

	return (
		amountOfOccurences >= validation.min &&
		amountOfOccurences <= validation.max
	)
}

const run = async () => {
	const list = await readList('2.txt')

	const passwordRows = getPasswordRows(list)
	const amountOfValidPassowrds = passwordRows.filter(isPasswordValid).length

	console.log(`The answer for 2a is: ${amountOfValidPassowrds}`)
}

run()
