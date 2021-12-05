import { readList } from '@/utils'

const defaultState = {
	nice: [] as string[],
	naughty: [] as string[],
}

const getStringState = (string: string[]) => {
	return string.reduce(stringReducer, defaultState)
}

const stringReducer = (state: typeof defaultState, string: string) => {
	const isNice = isNiceString(string)
	const collectionToInsert = isNice ? 'nice' : 'naughty'

	state[collectionToInsert].push(string)

	return state
}

const isNiceString = (string: string) => {
	return /(?:[aeiou][^aeiou]*){3}/.test(string) && /(.)\1+/.test(string) && !/ab|cd|pq|xy/.test(string)
}

const run = async () => {
	const list = await readList('5.txt', '2015')

	const stringState = getStringState(list)

	console.log(`The answer for 5a is: ${stringState.nice.length}`)
}

run()
