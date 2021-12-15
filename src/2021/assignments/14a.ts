import { readList } from '@/utils'

const state = {
	template: '',
	instructions: [] as [string, string][],
	counts: {} as Record<string, number>,
}

const getPolymerState = (list: string[]) => {
	list.forEach((item) => {
		if (item.includes(' -> ')) {
			const [pattern, insertion] = item.split(' -> ')
			state.instructions.push([pattern, insertion])
		} else if (item) {
			state.template = item
		}
	})

	for (let i = 0; i < 10; i++) {
		let snippets = state.template.split('').reduce<Record<number, string>>(
			(map, character, index) => ({
				...map,
				[index]: character,
			}),
			{},
		)
		const keys = Object.keys(snippets).map(Number)

		state.instructions.forEach(([pattern, insertion]) => {
			keys.forEach((index) => {
				const pair = snippets[index] + snippets[index + 1]
				if (pair === pattern) {
					snippets[index + 0.5] = insertion
				}
			})
		})

		state.counts = {}
		state.template = Object.keys(snippets)
			.map(Number)
			.sort((a, b) => a - b)
			.map((i) => {
				state.counts[snippets[i]] = (state.counts[snippets[i]] || 0) + 1
				return snippets[i]
			})
			.join('')
	}

	return state
}

const run = async () => {
	const list = await readList('14.dummy.txt')

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
	console.log(state.counts)

	console.log(`The answer for 14a is: ${data.max - data.min}`)
}

run()
