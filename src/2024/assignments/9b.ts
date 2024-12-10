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

		const fileSegments = segments.filter((segment) => segment.type === 'file').sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
		for (const file of fileSegments) {
			const fileLength = file.length
			const fileId = file.id as number

			const fileStartIndex = blocks.findIndex((block) => block === fileId)

			let freeStartIndex = -1
			let freeLength = 0

			for (let i = 0; i < blocks.length; i++) {
				if (blocks[i] === null) {
					if (freeStartIndex === -1) {
						freeStartIndex = i
					}
					freeLength++
					if (freeLength >= fileLength) {
						break
					}
				} else {
					freeStartIndex = -1
					freeLength = 0
				}
			}

			if (freeLength >= fileLength && freeStartIndex < fileStartIndex) {
				for (let i = 0; i < blocks.length; i++) {
					if (blocks[i] === fileId) {
						blocks[i] = null
					}
				}

				for (let i = 0; i < fileLength; i++) {
					blocks[freeStartIndex + i] = fileId
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

	console.log(`The answer for 9b is: ${checksum}`)
}

run()
