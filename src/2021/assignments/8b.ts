import { readList } from '@/utils'

const segmentFitsInSegment = (a: string, b: string) => a.split('').every((character) => b.includes(character))

const getDecodedSegments = (segments: string[]) => {
	const oneSegment = segments.find((segment) => segment.length === 2)!
	const fourSegment = segments.find((segment) => segment.length === 4)!
	const sevenSegment = segments.find((segment) => segment.length === 3)!
	const eightSegment = segments.find((segment) => segment.length === 7)!

	const nineSegment = segments.find((segment) => segment.length === 6 && segmentFitsInSegment(fourSegment, segment))!
	const zeroSegment = segments.find(
		(segment) => segment.length === 6 && segmentFitsInSegment(oneSegment, segment) && segment !== nineSegment,
	)!
	const sixSegment = segments.find((segment) => segment.length === 6 && segment !== zeroSegment && segment !== nineSegment)!

	const threeSegment = segments.find((segment) => segment.length === 5 && segmentFitsInSegment(sevenSegment, segment))!
	const fiveSegment = segments.find((segment) => segment.length === 5 && segmentFitsInSegment(segment, sixSegment))!
	const twoSegment = segments.find((segment) => segment.length === 5 && segment !== threeSegment && segment !== fiveSegment)!

	return {
		[zeroSegment]: 0,
		[oneSegment]: 1,
		[twoSegment]: 2,
		[threeSegment]: 3,
		[fourSegment]: 4,
		[fiveSegment]: 5,
		[sixSegment]: 6,
		[sevenSegment]: 7,
		[eightSegment]: 8,
		[nineSegment]: 9,
	}
}

const getCounts = (list: string[]) => {
	const data = list.map((string) => {
		const [inputWires, outputWires] = string.split(' | ')

		const segments = inputWires.split(' ').map((i) => i.split('').join(''))
		const segmentsToDigits = getDecodedSegments(segments)

		const outputSegments = outputWires.split(' ').map((i) => i.split('').join(''))
		const output = outputSegments.map((segment) => {
			const segmentKey = Object.keys(segmentsToDigits).find((key) => {
				return key.length === segment.length && key.split('').every((c) => segment.split('').includes(c))
			})

			return segmentsToDigits[segmentKey!]
		})

		return {
			raw: string,
			segments,
			segmentsToDigits,
			outputSegments,
			output,
		}
	})

	return data.reduce<number>((uniqueSegments, segmentData) => {
		return uniqueSegments + Number(segmentData.output.join(''))
	}, 0)
}

const run = async () => {
	const list = await readList('8.txt')

	const counts = getCounts(list)

	console.log(`The answer for 8b is: ${counts}`)
}

run()
