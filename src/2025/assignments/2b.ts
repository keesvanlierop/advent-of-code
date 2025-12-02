import { chunks, readList } from '@/utils'

const run = async () => {
	const list = await readList('2.txt')
	const sequence = list[0].split(',')

	let invalidIdCount = 0

	sequence.forEach((item) => {
		const [start, end] = item.split('-')
		const array = Array.from({ length: Number(end) - Number(start) + 1 }, (_, i) => Number(start) + i)
		array
			.filter((id) => id >= 11)
			.forEach((id) => {
				const maxLength = Math.ceil(String(id).length / 2)
				const capturedInvalidIds: Record<number, boolean> = {}
				for (let i = 1; i <= maxLength; i++) {
					if (capturedInvalidIds[id]) continue

					const chunked = [...chunks(String(id).split(''), i)]
					const isRepeated = chunked.every((chunk) => chunk.join('') === chunked[0]?.join(''))
					if (isRepeated && !capturedInvalidIds[id]) {
						invalidIdCount += id
						capturedInvalidIds[id] = true
					}
				}
			})
	})

	console.log(`The answer for 2b is: ${invalidIdCount}`)
}

run()
