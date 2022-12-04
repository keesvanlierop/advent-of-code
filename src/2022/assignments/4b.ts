import { add, readList } from '@/utils'

const getPairs = (list: string[]) => {
	return list.map(row => {
        return row.split(',').map(elf => elf.split('-').map(Number)) as [[number, number], [number, number]]
    })
}

const isOverlapping = (a: [number, number], b: [number, number]) => Math.max(a[0],b[0]) <= Math.min(a[1], b[1])

const getOverlappingPairs = (pairs: [[number, number], [number, number]][]) => {
    return pairs.filter((pair) => isOverlapping(pair[0], pair[1]))
}

const run = async () => {
	const list = await readList('4.txt')

	const pairs = getPairs(list)
    const overlapping = getOverlappingPairs(pairs)

	console.log(
		`The answer for 4b is: ${overlapping.length}`,
	)
}

run()
