import { readList } from '@/utils'

const state = {
	instructions: [] as [string, string][],
	counts: {} as Record<string, number>,
	template: {} as Record<string, number>,
}

const getPolymerState = (list: string[]) => {
	list.forEach((item) => {
		if (item.includes(' -> ')) {
			const [pattern, insertion] = item.split(' -> ')
			state.instructions.push([pattern, insertion])
		} else if (item) {
			state.template = item
				.split('')
				.map((c, i, s) => c + s[i + 1])
				.filter((c) => c.length === 2)
				.reduce<typeof state['template']>(
					(map, pair) => ({
						...map,
						[pair]: (map[pair] || 0) + 1,
					}),
					{},
				)

			state.counts = item.split('').reduce<typeof state['counts']>(
				(map, c) => ({
					...map,
					[c]: (map[c] || 0) + 1,
				}),
				{},
			)
		}
	})

	for (let i = 0; i < 40; i++) {
		const cloned = { ...state.template }

		state.instructions.forEach(([pattern, insertion]) => {
			const amount = state.template[pattern] || 0

			if (amount) {
				cloned[pattern[0] + insertion] = (cloned[pattern[0] + insertion] || 0) + amount
				cloned[insertion + pattern[1]] = (cloned[insertion + pattern[1]] || 0) + amount
				state.counts[insertion] = (state.counts[insertion] || 0) + amount

				cloned[pattern] = cloned[pattern] ? cloned[pattern] - amount : 0
			}
		})

		state.template = { ...cloned }
	}

	return state
}

const run = async () => {
	const list = await readList('14.txt')

	const state = getPolymerState(list)

	const data = Object.values(state.counts).reduce(
		(data, count) => ({
			max: Math.max(count, data.max),
			min: Math.min(count, data.min) || count,
		}),
		{
			max: 0,
			min: 0,
		},
	)

	console.log(`The answer for 14b is: ${data.max - data.min}`)
}

run()
