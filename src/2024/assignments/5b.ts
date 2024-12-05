import { add, multiply, readList } from '@/utils'

const run = async () => {
	const list = await readList('5.txt')

	const splitList = (list: string[]) => {
		const index = list.findIndex((item) => item.trim() === '')
		if (index === -1) return [list, []]
		return [list.slice(0, index), list.slice(index + 1)]
	}

	const isValidSequence = (sequence: number[]) => {
		const sequenceInReverse = [...sequence].reverse()
		return sequenceInReverse.every((item, index) => {
			const nextItems = sequenceInReverse.slice(index + 1, sequenceInReverse.length)
			return !nextItems.some((nextItem) => rulesRegistry.get(item)?.has(nextItem))
		})
	}

	const correctSequence = (sequence: number[]) => {
		const correctedSequence = [...sequence].sort((a, b) => {
			if (rulesRegistry.get(a)?.has(b)) {
				return -1
			} else if (rulesRegistry.get(b)?.has(a)) {
				return 1
			} else {
				return 0
			}
		})
		return correctedSequence
	}

	const [section1, section2] = splitList(list)

	const rules = section1.map((item) => item.split('|').map(Number))
	const rulesRegistry = new Map<number, Map<number, 1>>()

	rules.forEach((rule) => {
		if (!rulesRegistry.has(rule[0])) {
			rulesRegistry.set(rule[0], new Map<number, 1>())
		}

		const map = rulesRegistry.get(rule[0])!
		map.set(rule[1], 1)
	})

	const sequences = section2.map((item) => item.split(',').map(Number))
	const invalidSequences = sequences.filter((sequence) => !isValidSequence(sequence))
	const correctedSequences = invalidSequences.map(correctSequence)
	const middleNumberInSequence = correctedSequences.map((sequence) => sequence[Math.floor(sequence.length / 2)])

	console.log(`The answer for 5b is: ${add(middleNumberInSequence)}`)
}

run()
