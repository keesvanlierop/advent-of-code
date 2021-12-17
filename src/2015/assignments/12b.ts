import { readList } from '@/utils'

const getSum = (input: Record<string, any>): number => {
	if (Array.isArray(input)) {
		return input.reduce((total, item) => total + getSum(item), 0)
	} else if (typeof input === 'object') {
		const values = Object.values(input)
		return values.includes('red') ? 0 : values.reduce((total, item) => total + getSum(item), 0)
	} else if (typeof input === 'number') {
		return input
	} else {
		return 0
	}
}

const run = async () => {
	const list = await readList('12.txt', '2015')

	const sum = getSum(JSON.parse(list[0]))

	console.log(`The answer for 12b is: ${sum}`)
}

run()
