import { readList } from '@/utils'

const run = async () => {
	const list = await readList('11.dummy.txt')

	let stonesRow = list[0]
	let stones = stonesRow.split(' ').map(Number)

	const stonesRegistry = stones.reduce((acc, stone) => {
		acc[stone] = undefined
		return acc
	}, {} as Record<number, undefined | number | number[]>)

	const calculate = () => {
		const stones = Object.keys(stonesRegistry).map(Number)
		for (const key of stones) {
			if (!stonesRegistry[key]) {
				if (key === 0) {
					stonesRegistry[key] = 1
					if (!stonesRegistry[1]) {
						stonesRegistry[1] = undefined
					}
				} else if (key.toString().length % 2 === 0) {
					const str = key.toString()
					const mid = Math.floor(str.length / 2)
					const leftHalf = Number(str.slice(0, mid))
					const rightHalf = Number(str.slice(mid))
					stonesRegistry[key] = [leftHalf, rightHalf]
					if (!stonesRegistry[leftHalf]) {
						stonesRegistry[leftHalf] = undefined
					}
					if (!stonesRegistry[rightHalf]) {
						stonesRegistry[rightHalf] = undefined
					}
				} else {
					stonesRegistry[key] = key * 2024
					if (!stonesRegistry[key * 2024]) {
						stonesRegistry[key * 2024] = undefined
					}
				}
			}
		}
	}

	const lookupAmountOfStones = (i: number, stonesArray = stones) => {
		if (i === 0) return
		stones.forEach((stone) => {
			const array = (stonesRegistry[stone] && Array.isArray(stonesRegistry[stone])
				? stonesRegistry[stone]
				: [stonesRegistry[stone]]) as number[]

			amount += array.length
			lookupAmountOfStones(i - 1, array)
		})
	}

	for (let i = 0; i < 75; i++) {
		calculate()
		console.log('calculate', i)
	}

	let amount = 0

	lookupAmountOfStones(25)

	console.log(`The answer for 11b is: ${amount}`)
}

run()
