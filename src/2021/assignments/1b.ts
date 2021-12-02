import { multiply, readList } from '@/utils'

interface Measurements {
	amountOfLargerMeasurements: number
	amountOfLargerSums: number
	previousSum: number | null
	previousMeasurement: number | null
}

const getMeasurementsInfo = (list: number[]) => {
	return list.reduce<Measurements>(
		(measurements, measurement, index) => {
			const sum = list.slice(index, index + 3)
			const sumTotal = sum.reduce((total, number) => total + number, 0)

			return {
				previousMeasurement: measurement,
				previousSum: sumTotal,
				amountOfLargerMeasurements:
					measurements.previousMeasurement &&
					measurement > measurements.previousMeasurement
						? measurements.amountOfLargerMeasurements + 1
						: measurements.amountOfLargerMeasurements,
				amountOfLargerSums:
					measurements.previousSum &&
					sum.length === 3 &&
					sumTotal > measurements.previousSum
						? measurements.amountOfLargerSums + 1
						: measurements.amountOfLargerSums,
			}
		},
		{
			amountOfLargerMeasurements: 0,
			amountOfLargerSums: 0,
			previousSum: null,
			previousMeasurement: null,
		},
	)
}

const run = async () => {
	const list = await readList('1.txt')

	const numbers = list.map(Number)

	const measurementsInfo = getMeasurementsInfo(numbers)

	console.log(`The answer for 1b is: ${measurementsInfo.amountOfLargerSums}`)
}

run()
