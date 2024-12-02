import { add, readList } from '@/utils'

const run = async () => {
	const list = await readList('1.txt')

	const list1: number[] = []
	const list2: number[] = []
	const registry: Record<number, number> = {}

	list.forEach((item) => {
		const [one, two] = item.split('   ')
		list1.push(Number(one))
		list2.push(Number(two))
	})

	for (let i = 0; i < list1.length; i++) {
		registry[list1[i]] = list2.filter((n) => n === list1[i]).length
	}

	const similarityScores = Object.entries(registry).map(([key, value]) => ((key as unknown) as number) * value)

	console.log(`The answer for 1a is: ${add(similarityScores)}`)
}

run()
