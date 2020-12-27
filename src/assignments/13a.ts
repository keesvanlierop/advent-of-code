import { add, readList, run } from '@/utils'

const getWaitingTime = (timestamp: number, line: number) =>
	line - (timestamp % line)

const getBusWaitingTime = async () => {
	const list = await readList('13.txt')

	const timestamp = Number(list[0])
	const lines = list[1]
		.split(',')
		.filter((line) => line !== 'x')
		.map(Number)

	const shortestWaitingTime = Math.min(
		...lines.map((line) => getWaitingTime(timestamp, line)),
	)
	const busId = lines.find(
		(line) => getWaitingTime(timestamp, line) === shortestWaitingTime,
	)

	return shortestWaitingTime * busId!
}

run('13a', getBusWaitingTime)
