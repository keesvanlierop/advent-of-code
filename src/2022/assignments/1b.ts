import { add, readList } from '@/utils'

const getElvesFromList = (list: string[]) => {
	const elves: number[][] = []
	let index = 0 

	list.forEach((row) => {
		if (row.length) {
			if (!elves[index]) elves[index] = []
			elves[index].push(Number(row))
		} else {
			index ++
		}
	})

	return elves
}

const run = async () => {
	const list = await readList('1.txt')

	const elves = getElvesFromList(list)
	const elvesOrderedByMostCalories = elves
		.map(elf => add(elf))
		.sort((a,b) => b - a)

	console.log(
		`The answer for 1b is: ${elvesOrderedByMostCalories[0] + elvesOrderedByMostCalories[1] + elvesOrderedByMostCalories[2]}`,
	)
}

run()
