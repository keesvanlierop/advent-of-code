import { readList } from '@/utils'

enum Direction {
    R = 'R',
    L = 'L',
    D = 'D',
    U = 'U'
}

let startCoordinates: readonly [number, number] = [0,0]

let currentPosH = startCoordinates
let currentPosT = startCoordinates

const tailVisitedCoordinates: Record<string, number> = {
    '0,0': 1
}

const getTailVisitedCoordinates = (list: string[]) => 
    list.forEach(row => {
        const [direction, steps] = row.split(' ')
        return getTailVisitedCoordinatesForCommand(direction as Direction, Number(steps))
    })

const getTailVisitedCoordinatesForCommand = (direction: Direction, steps: number) => {
    for (let i = 0; i < steps; i++) {
        currentPosH = getNextPosition(currentPosH, direction)

        if (!tailAndHeadAreOrthoDiagonallyAdjacent(currentPosH, currentPosT)) {
            currentPosT = getTailingPosition(currentPosH, direction)
            tailVisitedCoordinates[`${currentPosT[0]},${currentPosT[1]}`] = (tailVisitedCoordinates[`${currentPosT[0]},${currentPosT[1]}`] || 0) + 1  
        }
    }
}

const getNextPosition = (coordinates: readonly [number, number], direction: Direction) => ({
    [Direction.R]: [coordinates[0] + 1, coordinates[1]] as const,
    [Direction.L]: [coordinates[0] - 1, coordinates[1]] as const,
    [Direction.D]: [coordinates[0], coordinates[1] + 1] as const,
    [Direction.U]: [coordinates[0], coordinates[1] - 1] as const,
})[direction]

const getTailingPosition = (coordinates: readonly [number, number], direction: Direction) => ({
    [Direction.R]: [coordinates[0] - 1, coordinates[1]] as const,
    [Direction.L]: [coordinates[0] + 1, coordinates[1]] as const,
    [Direction.D]: [coordinates[0], coordinates[1] - 1] as const,
    [Direction.U]: [coordinates[0], coordinates[1] + 1] as const,
})[direction]

const tailAndHeadAreOrthoDiagonallyAdjacent = (posT: readonly [number, number], posH: readonly [number, number]) => {
    return (
        Math.abs(posT[0] - posH[0]) <= 1
        &&
        Math.abs(posT[1] - posH[1]) <= 1
    )
}

const run = async () => {
	const list = await readList('9.txt')

    getTailVisitedCoordinates(list)

	console.log(
		`The answer for 9a is: ${Object.keys(tailVisitedCoordinates).length}`,
	)
}

run()
