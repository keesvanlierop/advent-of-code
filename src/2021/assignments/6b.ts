import { readList } from '@/utils'

const getFishState = (fish: number[]) => {
	const fishMap = fish.reduce<Record<number, number>>(
		(fishMap, fish) => ({
			...fishMap,
			[fish]: (fishMap[fish] || 0) + 1,
		}),
		{},
	)

	const state = {
		fish: fishMap,
		day: 0,
	}

	for (let day = 0; day <= 255; day++) {
		const newState: Record<number, number> = {}

		Object.entries(state.fish).forEach(([interval, amountOfFishForInterval]) => {
			const i = Number(interval)

			if (i === 0) {
				newState[8] = amountOfFishForInterval
				newState[6] = amountOfFishForInterval
			} else {
				newState[i - 1] = (newState[i - 1] || 0) + amountOfFishForInterval
			}
		})

		state.fish = newState
		state.day = day
	}

	return state
}

const run = async () => {
	const list = await readList('6.txt')

	const state = getFishState(list[0].split(',').map(Number))

	console.log(`The answer for 6a is: ${Object.values(state.fish).reduce((total, amount) => total + amount, 0)}`)
}

run()
