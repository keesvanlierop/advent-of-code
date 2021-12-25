import { readList } from '@/utils'

const AUNT_SUE_REGEX = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/

const scan = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1,
}

const getAunts = (list: string[]) => {
	const aunts = list.map((aunt) => {
		const parts = aunt.match(AUNT_SUE_REGEX)
		return {
			number: Number(parts?.[1]),
			properties: {
				[parts?.[2] || '']: Number(parts?.[3]),
				[parts?.[4] || '']: Number(parts?.[5]),
				[parts?.[6] || '']: Number(parts?.[7]),
			},
		}
	})

	return aunts
}

const run = async () => {
	const list = await readList('16.txt', '2015')

	const aunts = getAunts(list)
	const daRealAuntSue = aunts.find((aunt) =>
		Object.entries(aunt.properties).every(([key, value]) => value === scan[key as keyof typeof scan]),
	)

	console.log(`The answer for 16a is: ${daRealAuntSue?.number}`)
}

run()
