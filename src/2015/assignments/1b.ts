import { readList } from '@/utils'

const symbolMap = {
	')': -1,
	'(': 1,
}
const run = async () => {
	const list = await readList('1.txt', '2015')

	let firstPositionToBasement = 0
	const floor = list[0].split('').reduce((floor, symbol, index) => {
		const newFloor = floor + symbolMap[symbol as keyof typeof symbolMap]

		if (newFloor === -1 && !firstPositionToBasement) {
			firstPositionToBasement = index + 1
		}

		return newFloor
	}, 0)

	console.log(`The answer for 1b is: ${firstPositionToBasement}`)
}

run()
