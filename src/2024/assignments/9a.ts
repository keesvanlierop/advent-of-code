import { add, chunks, readList } from '@/utils'

const run = async () => {
	const diskMap = (await readList('9.txt'))[0]

	function compactDisk(diskMap: string): number {
		let segments: { type: 'file' | 'space'; length: number; id?: number }[] = []
		let isFile = true
		let fileId = 0

		for (const char of diskMap) {
			const length = parseInt(char, 10)
			if (length > 0) {
				segments.push({
					type: isFile ? 'file' : 'space',
					length,
					id: isFile ? fileId++ : undefined,
				})
			}
			isFile = !isFile
		}

		let blocks: (number | null)[] = []
		for (const segment of segments) {
			if (segment.type === 'file' && segment.id !== undefined) {
				blocks.push(...Array(segment.length).fill(segment.id))
			} else {
				blocks.push(...Array(segment.length).fill(null))
			}
		}

		for (let i = blocks.length - 1; i >= 0; i--) {
			if (blocks[i] !== null) {
				// Find the leftmost free space
				const leftmostFreeIndex = blocks.indexOf(null)
				if (leftmostFreeIndex >= 0 && leftmostFreeIndex < i) {
					// Move block to the free space
					blocks[leftmostFreeIndex] = blocks[i]
					blocks[i] = null
				}
			}
		}

		let checksum = 0
		for (let i = 0; i < blocks.length; i++) {
			if (blocks[i] !== null) {
				checksum += i * (blocks[i] as number)
			}
		}

		return checksum
	}
	const checksum = compactDisk(diskMap)

	console.log(`The answer for 9a is: ${checksum}`)
}

run()
