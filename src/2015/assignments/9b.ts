import { permute, readList } from '@/utils'

const getLongestRoute = (list: string[]) => {
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

	return allRoutes.reduce<number | null>((longestDistance, route) => {
		const distance = route
			.map((city, index, self) => locations[city][self[index - 1]] || 0)
			.reduce((total, distance) => total + distance, 0)
		if (longestDistance === null) return distance
		return Math.max(longestDistance, distance)
	}, null)
}

const run = async () => {
	const list = await readList('9.txt', '2015')

	const longestFlight = getLongestRoute(list)

	console.log(`The answer for 9b is: ${longestFlight}`)
}

run()
