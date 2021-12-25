import { permute, readList } from '@/utils'

interface Reindeer {
	speed: number
	travelTime: number
	restTime: number
}

const REINDEER_REGEX = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./

const getDistanceTraveled = (list: string[]) => {
	const reindeers: Record<string, Reindeer> = {}

	list.forEach((item) => {
		const parts = item.match(REINDEER_REGEX)
		if (!parts) return

		reindeers[parts[1]] = {
			speed: Number(parts[2]),
			travelTime: Number(parts[3]),
			restTime: Number(parts[4]),
		}
	})

	return Math.max(...Object.values(reindeers).map((reindeer) => getTraveledDistance(reindeer, 2503)))
}

const getTraveledDistance = (reindeer: Reindeer, amountOfSeconds: number) => {
	let currentSecond = 0
	let distanceTraveled = 0

	while (currentSecond < amountOfSeconds) {
		const timeLeft = Math.min(amountOfSeconds - currentSecond, reindeer.travelTime)
		distanceTraveled += timeLeft * reindeer.speed
		currentSecond += timeLeft + reindeer.restTime
	}

	return distanceTraveled
}

const run = async () => {
	const list = await readList('14.txt', '2015')

	const distanceTravelled = getDistanceTraveled(list)

	console.log(`The answer for 14a is: ${distanceTravelled}`)
}

run()
