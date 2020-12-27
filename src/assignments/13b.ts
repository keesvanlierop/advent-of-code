import { multiply, readList, run } from '@/utils'

interface Bus {
	line: number
	offset: number
}

const nextTimestamp = (
	initialTimestamp: number,
	increment: number,
	nextBus: Bus,
): number => {
	while ((initialTimestamp + nextBus.offset) % nextBus.line != 0) {
		initialTimestamp += increment
	}
	return initialTimestamp
}

const getBusWaitingTime = async () => {
	const list = await readList('13.txt')

	const linesWithOffset = list[1]
		.split(',')
		.map(Number)
		.map((id, index) => ({ line: Number(id), offset: index }))
		.filter((c) => !isNaN(c.line))

	let timestamp = 0
	let inc = 1

	linesWithOffset.forEach((line, index) => {
		inc *= linesWithOffset[index - 1]?.line || 1
		timestamp = nextTimestamp(timestamp, inc, line)
	})

	return timestamp
}

run('13b', getBusWaitingTime)
