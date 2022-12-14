import { readList } from '@/utils'

const lowercase: string[] = Array.from(Array(26)).map((e, i) => i + 97).map(x => String.fromCharCode(x))

const getGrid = (list: string[]) => 
    list.map(row => row.split(''))

const getCoordinatesByLetter = (grid: string[][], letter: string) => {
    let x = -1
    let y = -1

    grid.forEach((row, rowIndex) => {
        if(row.some((cell, cellIndex) => {
            if (cell === letter) {
                x = cellIndex
                return true
            }

            return false
        })) {
            y = rowIndex
        }
    })

    return [x, y] as const
}

const getAdjacentCoordinates = (grid: string[][], coordinates: readonly [number, number]) => {
    return [
        // top
        [coordinates[0], coordinates[1] - 1] as const,
        // right
        [coordinates[0] + 1, coordinates[1]] as const,
        // bottom
        [coordinates[0], coordinates[1] + 1] as const,
        // left
        [coordinates[0] - 1, coordinates[1]] as const,
    ]
        .filter(coordinates => !!grid[coordinates[1]]?.[coordinates[0]])
}

const getNumericGrid = (grid: string[][]) => {
    const numericGrid: number[][] = []

    grid.forEach((row, x) => {
        numericGrid[x] = []

        row.forEach((cell, y) => {
            if(cell === 'S'){
            numericGrid[x][y] = lowercase.indexOf('a')
            } else if (cell === 'E'){
            numericGrid[x][y] = lowercase.indexOf('z')
            } else {
            numericGrid[x][y] = lowercase.indexOf(cell)
            }
        })
    })

    return numericGrid
}

const getShortestPath = (list: string[]) => {
    const grid = getGrid(list)
    const numericGrid = getNumericGrid(grid)
    const start = getCoordinatesByLetter(grid, 'S') as [number, number]
    const end = getCoordinatesByLetter(grid, 'E') as [number, number]

    const alreadyVisited = new Set<string>()

    let queue: [[number, number], number][] = [[start, 0]]

    while (queue.length) {
        const [coordinates, steps] = queue.shift()!
        if(alreadyVisited.has(coordinates.toString())) {
          continue
        }
        alreadyVisited.add(coordinates.toString())

        if (coordinates.toString() === end.toString()) {
            return steps
        }

        const adjacentCoordinates = getAdjacentCoordinates(grid, coordinates)


        const viableCoordinates = adjacentCoordinates.filter(c => numericGrid[c[1]][c[0]] <= numericGrid[coordinates[1]][coordinates[0]] + 1 )

        // @ts-ignore
        queue = queue.concat(viableCoordinates.map(coordinates => [coordinates, steps + 1]))
    }
}

const run = async () => {
	const list = await readList('12.txt')

	console.log(
		`The answer for 12a is: ${getShortestPath(list)}`,
	)
}

run()
