import { readList } from '@/utils'

enum Direction {
    R = 'R',
    L = 'L',
    D = 'D',
    U = 'U'
}

type Coordinates = [number, number]

const AMOUNT_OF_KNOTS = 10

const knotsCoordinates: Coordinates[] = Array.from(Array(AMOUNT_OF_KNOTS).keys()).map(_ => [0, 0])

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
        knotsCoordinates.forEach((knot, knotIndex) => {
            if (knotIndex === 0) {
                knotsCoordinates[knotIndex] = getNextPosition(knot, direction)
            } else {
                if (!tailAndHeadAreOrthoDiagonallyAdjacent(knot, knotsCoordinates[knotIndex - 1])) {
                    knotsCoordinates[knotIndex] = getTailingPositionData(knotsCoordinates[knotIndex - 1], knot)

                    if (knotIndex === knotsCoordinates.length - 1) {
                        tailVisitedCoordinates[`${knotsCoordinates[knotIndex][0]},${knotsCoordinates[knotIndex][1]}`] = (tailVisitedCoordinates[`${knotsCoordinates[knotIndex][0]},${knotsCoordinates[knotIndex][1]}`] || 0) + 1  
                    }
                }
            }
        })
    }
}

const getNextPosition = (coordinates: Coordinates, direction: Direction) => ({
    [Direction.R]: [coordinates[0] + 1, coordinates[1]] as Coordinates,
    [Direction.L]: [coordinates[0] - 1, coordinates[1]] as Coordinates,
    [Direction.D]: [coordinates[0], coordinates[1] + 1] as Coordinates,
    [Direction.U]: [coordinates[0], coordinates[1] - 1] as Coordinates,
})[direction]

const getTailingPositionData = (leadingKnot: Coordinates, tailingKnot: Coordinates): Coordinates => {
    const xDelta = leadingKnot[0] !== tailingKnot[0]
        ? leadingKnot[0] - tailingKnot[0]
        : 0
    const yDelta = leadingKnot[1] !== tailingKnot[1]
        ? leadingKnot[1] - tailingKnot[1]
        : 0

    let xMove = Math.abs(xDelta) === 2 ? xDelta / Math.abs(xDelta) : xDelta
    let yMove = Math.abs(yDelta) === 2 ? yDelta / Math.abs(yDelta) : yDelta

    return [tailingKnot[0] + xMove, tailingKnot[1] + yMove]
}

const tailAndHeadAreOrthoDiagonallyAdjacent = (posT: Coordinates, posH: Coordinates) => {
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
		`The answer for 9b is: ${Object.keys(tailVisitedCoordinates).length}`,
	)
}

run()
