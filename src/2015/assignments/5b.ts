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
	return /(..).*\1/.test(string) && /(.).\1/.test(string)
}

const run = async () => {
	const list = await readList('5.txt', '2015')

	const stringState = getStringState(list)

	console.log(`The answer for 5b is: ${stringState.nice.length}`)
}

run()
