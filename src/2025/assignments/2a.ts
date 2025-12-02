import { chunks, readList } from '@/utils'

const run = async () => {
	const list = await readList('2.txt')
	const sequence = list[0].split(',')

	let invalidIdCount = 0

	sequence.forEach((item) => {
		const [start, end] = item.split('-')
		const array = Array.from({ length: Number(end) - Number(start) + 1 }, (_, i) => Number(start) + i)
		array.forEach((id) => {
			const chunked = [...chunks(String(id).split(''), Math.ceil(String(id).length / 2))]
			const isRepeated = chunked[0]?.join('') === chunked[1]?.join('')
			if (isRepeated) {
				invalidIdCount += id
			}
		})
	})

	console.log(`The answer for 2a is: ${invalidIdCount}`)
}

run()
