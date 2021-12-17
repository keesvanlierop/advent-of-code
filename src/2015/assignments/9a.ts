import { permute, readList } from '@/utils'

const getShortestRoute = (list: string[]) => {
	const locations: Record<string, Record<string, number>> = {}

	list.forEach((item) => {
		const [cities, distance] = item.split(' = ')
		const [a, b] = cities.split(' to ')

		locations[a] = {
			...locations[a],
			[b]: Number(distance),
		}

		locations[b] = {
			...locations[b],
			[a]: Number(distance),
		}
	})

	const cities = Object.keys(locations)
	const allRoutes = permute(cities)

	return allRoutes.reduce<number | null>((shortestDistance, route) => {
		const distance = route
			.map((city, index, self) => locations[city][self[index - 1]] || 0)
			.reduce((total, distance) => total + distance, 0)
		if (shortestDistance === null) return distance
		return Math.min(shortestDistance, distance)
	}, null)
}

const run = async () => {
	const list = await readList('9.txt', '2015')

	const shortestFlight = getShortestRoute(list)

	console.log(`The answer for 9a is: ${shortestFlight}`)
}

run()
