import { readList } from '@/utils'

const getRequiredWrappingPaperForGift = (width: number, height: number, length: number) => {
	const lw = length * width
	const wh = width * height
	const hl = height * length

	return 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl)
}

const getRequiredRibbonForGift = (width: number, height: number, length: number) => {
	const sizes = [width, height, length].sort((a, b) => a - b).slice(0, 2)
	return width * height * length + (2 * sizes[0] + 2 * sizes[1])
}

const getRequiredRibbon = (list: string[]) => {
	return list
		.map((gift) => gift.split('x').map(Number))
		.map(([length, width, height]) => getRequiredRibbonForGift(length, width, height))
		.reduce((total, number) => total + number, 0)
}

const run = async () => {
	const list = await readList('2.txt', '2015')

	const requiredWrappingPaper = getRequiredRibbon(list)

	console.log(`The answer for 2a is: ${requiredWrappingPaper}`)
}

run()
