import { multiply, readList } from '@/utils'

interface Measurements {
	amountOfLargerMeasurements: number
	previousMeasurement: number | null
}

const getMeasurementsInfo = (list: number[]) => {
	return list.reduce<Measurements>(
		(measurements, measurement) => ({
			previousMeasurement: measurement,
			amountOfLargerMeasurements:
				measurements.previousMeasurement &&
				measurement > measurements.previousMeasurement
					? measurements.amountOfLargerMeasurements + 1
					: measurements.amountOfLargerMeasurements,
		}),
		{
			amountOfLargerMeasurements: 0,
			previousMeasurement: null,
		},
	)
}

const run = async () => {
	const list = await readList('1.txt')

	const numbers = list.map(Number)

	const measurementsInfo = getMeasurementsInfo(numbers)

	console.log(
		`The answer for 1a is: ${measurementsInfo.amountOfLargerMeasurements}`,
	)
}

run()
