import { multiply, readList, run } from '@/utils'

export interface Seat {
	rawData: string
	row: number
	column: number
}

export interface Directions {
	lowerHalf: string
	upperHalf: string
}

const amountOfSeatsPerRow = 8
const amountOfSeatsPerColumn = 128

const getVacantEntryBySequence = (
	sequence: string,
	directions: Directions,
	maximum: number,
) => {
	return (
		sequence.split('').reduce(
			(remainingSeats, direction) => {
				if (direction === directions.lowerHalf) {
					return {
						min: remainingSeats.min,
						max:
							remainingSeats.max -
							(remainingSeats.max - remainingSeats.min + 1) / 2,
					}
				}

				return {
					min:
						remainingSeats.min +
						(remainingSeats.max - remainingSeats.min + 1) / 2,
					max: remainingSeats.max,
				}
			},
			{
				min: 1,
				max: maximum,
			},
		).max - 1
	)
}

const getSeats = (list: string[]): Seat[] => {
	return list
		.map((item) => ({
			rawData: item,
			row: item.substr(0, 8),
			column: item.substr(7),
		}))
		.map((item) => ({
			...item,
			row: getVacantEntryBySequence(
				item.row,
				{
					lowerHalf: 'F',
					upperHalf: 'B',
				},
				amountOfSeatsPerColumn,
			),
			column: getVacantEntryBySequence(
				item.column,
				{
					lowerHalf: 'L',
					upperHalf: 'R',
				},
				amountOfSeatsPerRow,
			),
		}))
}

const getSeatId = (seat: Seat) => seat.row * amountOfSeatsPerRow + seat.column

const getSeatIds = (list: string[]) => {
	const seats = getSeats(list)
	return seats.map(getSeatId)
}

const getHighestBoardingPass = async () => {
	const list = await readList('5.txt')

	const seatIds = await getSeatIds(list)
	return Math.max(...seatIds)
}

run('5a', getHighestBoardingPass)
