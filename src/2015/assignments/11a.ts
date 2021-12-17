import { readList } from '@/utils'

const isValidPassword = (password: string) => {
	const charCodes = password.split('').map((c) => c.charCodeAt(0))
	return (
		charCodes.some((number, index, self) => self[index + 1] - number === 1 && self[index + 2] - self[index + 1] === 1) &&
		!/(i|o|l)/.test(password) &&
		/(\w)\1.*(\w)\2/.test(password)
	)
}

// Increments one char
const incrementChar = (char: string) => (char === 'z' ? 'a' : String.fromCharCode(char.charCodeAt(0) + 1))

// Increments the whole string by one char recursively
const increment = (string: string): string => {
	const nextChar = incrementChar(string.slice(-1))
	return nextChar === 'a' ? increment(string.slice(0, -1)) + 'a' : string.slice(0, -1) + nextChar
}

const getNextValidPassword = (input: string) => {
	let currentPassword = input

	while (!isValidPassword(currentPassword)) {
		currentPassword = increment(currentPassword)
	}

	return currentPassword
}

const run = async () => {
	const list = await readList('11.txt', '2015')

	const password = getNextValidPassword(list[0])

	console.log(`The answer for 11a is: ${password}`)
}

run()
