import { readList } from '@/utils'

const run = async () => {
	const list = await readList('1.txt')

	const list1: number[] = []
	const list2: number[] = []

	list.forEach((item) => {
		const [one, two] = item.split('   ')
		list1.push(Number(one))
		list2.push(Number(two))
	})

	list1.sort()
	list2.sort()

	let distance = 0

	for (let i = 0; i < list1.length; i++) {
		distance += Math.abs(list1[i] - list2[i])
	}

	console.log(`The answer for 1a is: ${distance}`)
}

run()
