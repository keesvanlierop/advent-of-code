import { readList } from '@/utils'

const run = async () => {
	const list = await readList('11.txt')

	let stones = list[0].split(' ').map(Number)
	let newStones = [...stones]

	const blink = () => {
		let spliced = 0
		for (let i = 0; i < stones.length; i++) {
			if (stones[i] === 0) {
				newStones[i + spliced] = 1
			} else if (stones[i].toString().length % 2 === 0) {
				const str = stones[i].toString()
				const mid = Math.floor(str.length / 2)
				const leftHalf = Number(str.slice(0, mid))
				const rightHalf = Number(str.slice(mid))
				newStones[i + spliced] = leftHalf
				newStones.splice(i + spliced + 1, 0, rightHalf)
				spliced += 1
			} else {
				newStones[i + spliced] = stones[i] * 2024
			}
		}

		stones = [...newStones]
	}

	for (let i = 0; i < 25; i++) {
		blink()
	}

	console.log(`The answer for 11a is: ${stones.length}`)
}

run()
