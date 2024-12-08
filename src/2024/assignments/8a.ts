import { add, multiply, readList } from '@/utils'

const run = async () => {
	const list = await readList('8.txt')

	const antennas: Record<string, [number, number][]> = {}
	const antinodesRegistry = new Set<string>()

	let xBounds = 0
	let yBounds = list.length

	list.forEach((line, y) => {
		line.split('').forEach((char, x) => {
			if (char === '.') return
			antennas[char] = [...(antennas[char] || []), [x, y]]
		})

		xBounds = line.length
	})

	for (const char in antennas) {
		const locations = antennas[char]
		const antinodes = locations.flatMap((location) => {
			const otherLocations = locations.filter((otherLocation) => otherLocation !== location)

			return otherLocations.flatMap((otherLocation) => {
				const dX = otherLocation[0] - location[0]
				const dY = otherLocation[1] - location[1]
				const antinode1X = location[0] - dX
				const antinode1Y = location[1] - dY
				const antinode2X = otherLocation[0] + dX
				const antinode2Y = otherLocation[1] + dY

				return [
					[antinode1X, antinode1Y],
					[antinode2X, antinode2Y],
				].filter((antinode) => {
					return antinode[0] >= 0 && antinode[1] >= 0 && antinode[0] < xBounds && antinode[1] < yBounds
				})
			})
		})

		antinodes.forEach((antinode) => {
			antinodesRegistry.add(antinode.join('-'))
		})
	}

	console.log('The updated grid: ')

	list.forEach((line, y) => {
		const updatedLine = line
			.split('')
			.map((char, x) => {
				if (antinodesRegistry.has(`${x}-${y}`) && char === '.') return '#'
				return char
			})
			.join('')

		console.log(updatedLine)
	})

	console.log(`The answer for 8a is: ${antinodesRegistry.size}`)
}

run()
