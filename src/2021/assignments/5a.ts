import { readList } from '@/utils'

type Diagram = Record<number, number[]>

const getVentsDiagram = (list: string[]) => {
	const diagram: Diagram = {}

	list.map((item) => {
		const [startData, endData] = item.split(' -> ')

		const [x1, y1] = startData.split(',').map(Number)
		const [x2, y2] = endData.split(',').map(Number)

		return [x1, y1, x2, y2] as const
	})
		.filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2)
		.forEach(([x1, y1, x2, y2]) => {
			const startX = Math.min(x1, x2)
			const endX = Math.max(x1, x2)
			const startY = Math.min(y1, y2)
			const endY = Math.max(y1, y2)

			for (let x = startX; x <= endX; x++) {
				if (!diagram[x]) diagram[x] = []
				for (let y = startY; y <= endY; y++) {
					diagram[x].push(y)
				}
			}
		})

	return diagram
}

const getPointsFromDiagram = (diagram: Diagram) => {
	return Object.entries(diagram).reduce((points, [, yCoordinates]) => {
		const amountOfPointsForX = yCoordinates.filter(
			(y1, index, self) => self.filter((y2) => y1 === y2).length >= 2 && self.findIndex((y2) => y1 === y2) === index,
		).length

		return points + amountOfPointsForX
	}, 0)
}

const run = async () => {
	const list = await readList('5.txt')

	const diagram = getVentsDiagram(list)
	const points = getPointsFromDiagram(diagram)

	console.log(`The answer for 5a is: ${points}`)
}

run()
