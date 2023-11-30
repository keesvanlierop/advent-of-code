import { readList } from '@/utils'

type Coordinates = [number, number]

const rocks = new Set<Coordinates>()
const SAND_LEAK_COORDINATES: Coordinates = [500, 0]

const getRocks = (list: string[]) => {
    list.forEach(row => {
        const coordinates = row.split(' -> ').map(c=>c.split(',').map(Number))

        console.log(coordinates)

        coordinates.forEach((c, index) => {
            if (!coordinates[index + 1]) return
            if(c[0] !== coordinates[index + 1][0]) drawHorizontalPath([c[0], coordinates[index + 1][0]], c[1])
            if(c[1] !== coordinates[index + 1][1]) drawVerticalPath([c[1], coordinates[index + 1][1]], c[0])
        })
    })
}

const drawHorizontalPath = ([from, to]: [number, number], y: number) => {
    const min = Math.min(from, to)
    const max = Math.max(from, to)
    for (let i = min; i <= max; i++) {
        rocks.add([i, y])
    }
}

const drawVerticalPath = ([from, to]: [number, number], x: number) => {
    const min = Math.min(from, to)
    const max = Math.max(from, to)
    for (let i = min; i <= max; i++) {
        rocks.add([x, i])
    }
}


const run = async () => {
	const list = await readList('14.dummy.txt')

    getRocks(list)

    console.log(rocks)

	console.log(
		`The answer for 6a is: ${123}`,
	)
}

run()
