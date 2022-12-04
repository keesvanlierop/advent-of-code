import { add, readList } from '@/utils'

const getPairs = (list: string[]) => {
	return list.map(row => {
        return row.split(',').map(elf => elf.split('-').map(Number)) as [[number, number], [number, number]]
    })
}

const getFullyContainingPairs = (pairs: [[number, number], [number, number]][]) => {
    return pairs.filter(
        ([elf1, elf2]) => (
            (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) ||
            (elf2[0] <= elf1[0] && elf2[1] >= elf1[1])
        )
    )
}

const run = async () => {
	const list = await readList('4.txt')

	const pairs = getPairs(list)
    const fullyContaining = getFullyContainingPairs(pairs)

	console.log(
		`The answer for 4a is: ${fullyContaining.length}`,
	)
}

run()
