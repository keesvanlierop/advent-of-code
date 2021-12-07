import { linearIncrement, readList } from '@/utils'

const getLeastFuel = (crabs: number[]) => {
	const minimumPosition = Math.min(...crabs)
	const maximumPosition = Math.max(...crabs)

	let leastFuel = 0

	for (let x = minimumPosition; x <= maximumPosition; x++) {
		let fuelRequired = 0
		for (let crab = 0; crab < crabs.length; crab++) {
			fuelRequired += linearIncrement(Math.abs(crabs[crab] - x))
		}

		if (leastFuel === 0 || fuelRequired < leastFuel) {
			leastFuel = fuelRequired
		}
	}

	return leastFuel
}

const run = async () => {
	const list = await readList('7.txt')

	const leastFuel = getLeastFuel(list[0].split(',').map(Number))

	console.log(`The answer for 7b is: ${leastFuel}`)
}

run()
