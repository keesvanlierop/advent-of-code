import { multiply, readList } from '@/utils'

enum Direction {
    NORTH = 'NORTH',
    WEST = 'WEST',
    SOUTH = 'SOUTH',
    EAST = 'EAST'
}

type VisibleTreesForDirections = Record<Direction, number>

const trees = new Map<string, VisibleTreesForDirections>()

const getGrid = (list: string[]) => list.map(row => row.split('').map(Number))

const getVisibleTrees = (list: number[][]) => {
    list.forEach((row, x) => {
        row.forEach((tree, y) => {
            getVisibleTreesForCoordinates(list, [x, y])
        })
    })
}

const getVisibleTreesForCoordinates = (list: number[][], [x, y]: [number, number]) => {
    const visibleTreesForCoordinates: VisibleTreesForDirections = {
        [Direction.NORTH]: 0,
        [Direction.WEST]: 0,
        [Direction.SOUTH]: 0,
        [Direction.EAST]: 0
    }

    let cursor = x + 1
    let lookingEast = true
    while (lookingEast) {
        if (typeof list[y][cursor] !== 'number') {
            lookingEast = false
        } else {
            visibleTreesForCoordinates[Direction.EAST]++

            if (list[y][cursor] >= list[y][x]) {
                lookingEast = false
            }

            cursor++
        }
    }

    cursor = x - 1
    let lookingWest = true
    while (lookingWest) {
        if (typeof list[y][cursor] !== 'number') {
            lookingWest = false
        } else {
            visibleTreesForCoordinates[Direction.WEST]++

            if (list[y][cursor] >= list[y][x]) {
                lookingWest = false
            }

            cursor--
        }
    }

    cursor = y + 1
    let lookingSouth = true
    while (lookingSouth) {
        if (typeof list[cursor]?.[x] !== 'number') {
            lookingSouth = false
        } else { 
            visibleTreesForCoordinates[Direction.SOUTH]++

            if (list[cursor]?.[x] >= list[y][x]) {
                lookingSouth = false
            }

            cursor++
        }
    }

    cursor = y - 1
    let lookingNorth = true
    while (lookingNorth) {
        if (typeof list[cursor]?.[x] !== 'number') {
            lookingNorth = false
        } else {   
            visibleTreesForCoordinates[Direction.NORTH]++

            if (list[cursor]?.[x] >= list[y][x]) {
                lookingNorth = false
            }

            cursor--
        }
    }

    trees.set(`${x},${y}`, visibleTreesForCoordinates)
}

const run = async () => {
	const list = await readList('8.txt')

    const grid = getGrid(list)
    getVisibleTrees(grid)

    console.log(trees)
    const highestScenicScore = Math.max(...Array.from(trees).map(([, config]) => multiply(Object.values(config))))

	console.log(
		`The answer for 8b is: ${highestScenicScore}`,
	)
}

run()
