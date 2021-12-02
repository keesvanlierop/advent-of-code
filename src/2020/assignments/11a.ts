import { readList, run } from '@/utils'

enum SeatState {
	EMPTY = 'L',
	NOT_A_SEAT = '.',
	OCCUPIED = '#',
}

class Seat {
	public constructor(public state: SeatState) {}

	public get isSeat() {
		return this.state !== SeatState.NOT_A_SEAT
	}

	public get isOccupied() {
		return this.state === SeatState.OCCUPIED
	}

	public get isEmpty() {
		return this.state === SeatState.EMPTY
	}

	public setState(state: SeatState) {
		this.state = state
	}
}

class Floor {
	public map: SeatState[][]
	public seats: any[]

	private iteration = 0

	public constructor(public input: string[]) {
		console.log('MAP')
		this.map = input.map((row) => row.split('')) as SeatState[][]

		console.log('SEATS')
		this.seats = this.map.flat().map((seat, index) => {
			const rowIndex = Math.floor(index / this.rowLength)
			const modulus = index % this.rowLength

			return {
				seat,
				index,
				rowIndex,
				modulus,
				adjacentSeats: this.getAdjacentSeatStatesForSeat(
					index,
					modulus,
				),
			}
		})

		console.log('END')
	}

	public get rowLength() {
		return this.map[0].length
	}

	public get floorState() {
		return this.map
			.flat()
			.map((seat) => seat)
			.join('')
	}

	public run() {
		const currentFloorState = this.floorState

		this.seats.forEach(({ rowIndex, modulus, adjacentSeats }) => {
			const states = adjacentSeats.map(
				(s: any) => currentFloorState[s],
			) as SeatState[]
			this.applyChangeRules(rowIndex, modulus, states)
		})

		if (this.floorState === currentFloorState) {
			return
		}

		this.iteration++

		this.run()
	}

	public get amountOfOccupiedSeats() {
		return this.map
			.flat()
			.join('')
			.split('')
			.filter((seat) => seat === SeatState.OCCUPIED).length
	}

	private getAdjacentSeatStatesForSeat(index: number, modulus: number) {
		const verticalAdjcentSeats = [
			...(index >= this.rowLength ? [index - this.rowLength] : []),
			...(index <= this.map.flat().length - this.rowLength - 1
				? [index + this.rowLength]
				: []),
		]
		const horizontalAdjacentSeats = [
			...(modulus !== 0 ? [index - 1] : []),
			...(modulus !== this.rowLength - 1 ? [index + 1] : []),
		]
		const diagonalAdjacentSeats = [
			...(index >= this.rowLength
				? [
						...(modulus !== 0 ? [index - this.rowLength - 1] : []),
						...(modulus !== this.rowLength - 1
							? [index - this.rowLength + 1]
							: []),
				  ]
				: []),
			...(index <= this.map.flat().length - this.rowLength - 1
				? [
						...(modulus !== 0 ? [index + this.rowLength - 1] : []),
						...(modulus !== this.rowLength - 1
							? [index + this.rowLength + 1]
							: []),
				  ]
				: []),
		]

		return [
			...verticalAdjcentSeats,
			...horizontalAdjacentSeats,
			...diagonalAdjacentSeats,
		]
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
			occupiedAdjacentSeats.length >= 4
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

run('11a', getAmountOfOccupiedSeats)
