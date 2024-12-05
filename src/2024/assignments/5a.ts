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
	const validSequences = sequences.filter(isValidSequence)
	const middleNumberInSequence = validSequences.map((sequence) => sequence[Math.floor(sequence.length / 2)])

	console.log(`The answer for 5a is: ${add(middleNumberInSequence)}`)
}

run()
