import { readList } from '@/utils'

const getDecodedSegments = (segments: string[]) => {
	const oneSegment = segments.find((segment) => segment.length === 2)!
	const fourSegment = segments.find((segment) => segment.length === 4)!
	const sevenSegment = segments.find((segment) => segment.length === 3)!
	const eightSegment = segments.find((segment) => segment.length === 7)!

	return {
		[oneSegment]: 1,
		[fourSegment]: 4,
		[sevenSegment]: 7,
		[eightSegment]: 8,
	}
}

const getCounts = (list: string[]) => {
	const data = list.map((string) => {
		const [inputWires, outputWires] = string.split(' | ')

		const segments = inputWires
			.split(' ')
			.map((i) => i.split('').sort().join(''))
			.sort()
		const segmentsToDigits = getDecodedSegments(segments)

		const outputSegments = outputWires
			.split(' ')
			.map((i) => i.split('').sort().join(''))
			.sort()
		const output = outputSegments.map((segment) => segmentsToDigits[segment])

		return {
			raw: string,
			segments,
			segmentsToDigits,
			outputSegments,
			output,
		}
	})

	return data.reduce<number>((uniqueSegments, segmentData) => {
		return uniqueSegments + segmentData.output.filter(Boolean).length
	}, 0)
}

const run = async () => {
	const list = await readList('8.txt')

	const counts = getCounts(list)

	console.log(`The answer for 8a is: ${counts}`)
}

run()
