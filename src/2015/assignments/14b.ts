import { permute, readList } from '@/utils'

interface Reindeer {
	name: string
	speed: number
	travelTime: number
	restTime: number
	travelledDistance: number
	score: number
}

const REINDEER_REGEX = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./

const getDistanceTraveled = (list: string[]) => {
	const reindeers: Record<string, Reindeer> = {}

	list.forEach((item) => {
		const parts = item.match(REINDEER_REGEX)
		if (!parts) return

		reindeers[parts[1]] = {
			name: parts[1],
			speed: Number(parts[2]),
			travelTime: Number(parts[3]),
			restTime: Number(parts[4]),
			travelledDistance: 0,
			score: 0,
		}
	})

	let second = 0

	while (second <= 2503) {
		Object.values(reindeers).forEach((reindeer) => {
			const allTime = reindeer.travelTime + reindeer.restTime
			const isTravelling = second % allTime < reindeer.travelTime
			if (isTravelling) {
				reindeers[reindeer.name].travelledDistance += reindeer.speed
			}
		})

		const reindeersInTheLead = Object.values(reindeers).reduce<Reindeer[]>((winningReindeers, reindeer) => {
			if (reindeer.travelledDistance > (winningReindeers[0]?.travelledDistance || 0)) return [reindeer]
			if (reindeer.travelledDistance === winningReindeers[0]?.travelledDistance) return [...winningReindeers, reindeer]
			return winningReindeers
		}, [])

		reindeersInTheLead.forEach((reindeer) => {
			reindeers[reindeer.name].score += 1
		})

		second++
	}

	return reindeers
}

const run = async () => {
	const list = await readList('14.txt', '2015')

	const reindeers = getDistanceTraveled(list)

	console.log(`The answer for 14b is: ${Math.max(...Object.values(reindeers).map(({ score }) => score))}`)
}

run()
