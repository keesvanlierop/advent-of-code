import { readList } from '@/utils'

const symbolMap = {
	')': -1,
	'(': 1,
}
const run = async () => {
	const list = await readList('1.txt', '2015')
	const floor = list[0].split('').reduce((floor, symbol) => floor + symbolMap[symbol as keyof typeof symbolMap], 0)

	console.log(`The answer for 1a is: ${floor}`)
}

run()
