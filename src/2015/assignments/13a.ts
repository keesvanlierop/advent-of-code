import { permute, readList } from '@/utils'

const SEAT_REGEX = /(\w+) would (lose|gain) (\d+) happiness units by sitting next to (\w+)/

const getHappinessChange = (list: string[]) => {
	const members: Record<string, Record<string, number>> = {}

	list.forEach((item) => {
		const parts = item.match(SEAT_REGEX)
		if (!parts?.[1]) return
		if (!members[parts[1]]) members[parts[1]] = {}
		members[parts[1]][parts[4]] = Number(parts[3]) * (parts[2] === 'lose' ? -1 : 1)
	})

	const options = permute(Object.keys(members))

	return Math.max(
		...options.map((seating) =>
			seating
				.map((member, index, self) => {
					const adjacentIndices =
						index === 0 ? [index + 1, self.length - 1] : index === self.length - 1 ? [index - 1, 0] : [index - 1, index + 1]

					return (members[member][self[adjacentIndices[0]]] || 0) + (members[member][self[adjacentIndices[1]]] || 0)
				})
				.reduce((total, amount) => total + amount, 0),
		),
	)

	return 0
}

const run = async () => {
	const list = await readList('13.txt', '2015')

	const happinessChange = getHappinessChange(list)

	console.log(`The answer for 13a is: ${happinessChange}`)
}

run()
