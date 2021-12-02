import { readList, run } from '@/utils'

enum SeatState {
	EMPTY = 'L',
	NOT_A_SEAT = '.',
	OCCUPIED = '#',
}

enum Direction {
	TOP,
	TOP_RIGHT,
	RIGHT,
	BOTTOM_RIGHT,
	BOTTOM,
	BOTTOM_LEFT,
	LEFT,
	TOP_LEFT,
}

interface Seat {
	seat: SeatState
	rowIndex: number
	columnIndex: number
	adjacentSeats: number[]
}

const directions: [number, number][] = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
]

class Floor {
	public map: SeatState[][]
	public mapFlat: SeatState[]
	public seats: Seat[]

	public constructor(public input: string[]) {
		console.log('MAP')
		this.map = input.map((row) => row.split('')) as SeatState[][]
		this.mapFlat = this.map.flat()

		console.log('SEATS')
		this.seats = this.mapFlat.map((seat, index) => {
			const rowIndex = Math.floor(index / this.rowLength)
			const columnIndex = index % this.rowLength

			return {
				seat,
				rowIndex,
				columnIndex,
				adjacentSeats: this.getAdjacentSeatStatesForSeat(
					rowIndex,
					columnIndex,
				),
			}
		})

		console.log('END')
	}

	public get rowLength() {
		return this.map[0].length
	}

	public get floorState() {
		return this.map.flat().join('')
	}

	public run() {
		const currentFloorState = this.floorState

		console.log('---- CURRENT -----')
		console.log(this.map.map((row) => row.join('')))

		this.seats.forEach(({ rowIndex, columnIndex, adjacentSeats }) => {
			const states = adjacentSeats.map(
				(s: any) => currentFloorState[s],
			) as SeatState[]
			this.applyChangeRules(rowIndex, columnIndex, states)
		})

		if (this.floorState === currentFloorState) {
			return
		}

		this.run()
	}

	public get amountOfOccupiedSeats() {
		return this.map
			.flat()
			.join('')
			.split('')
			.filter((seat) => seat === SeatState.OCCUPIED).length
	}

	private getNextEmptySeat(
		neighbourOffset: [number, number],
		rowIndex: number,
		columnIndex: number,
	): number | null {
		const nextRowIndex = rowIndex + neighbourOffset[0]
		const nextColumnIndex = columnIndex + neighbourOffset[1]
		const nextNeighbour = this.map[nextRowIndex]?.[nextColumnIndex]

		return nextNeighbour === SeatState.NOT_A_SEAT
			? this.getNextEmptySeat(
					neighbourOffset,
					nextRowIndex,
					nextColumnIndex,
			  )
			: nextNeighbour
			? nextRowIndex * this.rowLength + nextColumnIndex
			: null
	}

	private getAdjacentSeatStatesForSeat(
		rowIndex: number,
		columnIndex: number,
	) {
		return Object.values(directions)
			.map((neighbourOffset) =>
				this.getNextEmptySeat(neighbourOffset, rowIndex, columnIndex),
			)
			.filter((seat): seat is number => typeof seat === 'number')
	}

	public applyChangeRules(
		rowIndex: number,
		index: number,
		adjacentSeatStates: SeatState[],
	) {
		const occupiedAdjacentSeats = adjacentSeatStates.filter(
			(state) => state === SeatState.OCCUPIED,
		)

		if (
			this.map[rowIndex][index] === SeatState.EMPTY &&
			!occupiedAdjacentSeats.length
		) {
			return (this.map[rowIndex][index] = SeatState.OCCUPIED)
		}

		if (
			this.map[rowIndex][index] === SeatState.OCCUPIED &&
			occupiedAdjacentSeats.length >= 5
		) {
			return (this.map[rowIndex][index] = SeatState.EMPTY)
		}
	}
}

const getAmountOfOccupiedSeats = async () => {
	const list = await readList('11.txt')

	const floor = new Floor(list)

	floor.run()

	return floor.amountOfOccupiedSeats
}

run('11b', getAmountOfOccupiedSeats)
