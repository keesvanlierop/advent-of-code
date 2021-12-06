import { readList } from '@/utils'

const getFishState = (fish: number[]) => {
	const state = {
		fish,
		day: 0,
	}

	for (let day = 0; day <= 79; day++) {
		const newFishInDay: number[] = []
		state.fish.forEach((interval, index) => {
			if (interval === 0) {
				newFishInDay.push(8)
				state.fish[index] = 6
			} else {
				state.fish[index]--
			}
		})

		state.fish = state.fish.concat(newFishInDay)
		state.day = day
	}

	return state
}

const run = async () => {
	const list = await readList('6.txt')

	const state = getFishState(list[0].split(',').map(Number))

	console.log(`The answer for 6a is: ${state.fish.length}`)
}

run()
