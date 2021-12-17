import { readList } from '@/utils'

const getTargetArea = (string: string) => {
	const position = string.replace('target area: ', '')
	const [x, y] = position.split(', ')

	const [xMin, xMax] = x.replace('x=', '').split('..').map(Number)
	const [yMin, yMax] = y.replace('y=', '').split('..').map(Number)

	return {
		x: {
			min: xMin,
			max: xMax,
		},
		y: {
			min: yMin,
			max: yMax,
		},
	}
}

const getValidProbes = (targetArea: ReturnType<typeof getTargetArea>) => {
	let validProbes = []

	for (let xVelocity = 0; xVelocity < targetArea.x.max; xVelocity++) {
		for (let yVelocity = 100; yVelocity > targetArea.y.min; yVelocity--) {
			const velocity = [xVelocity, yVelocity] as const

			const probe = getProbe(targetArea, velocity)
			if (probe.isValid) {
				validProbes.push(probe)
			}
		}
	}

	return validProbes
}

const getProbe = (targetArea: ReturnType<typeof getTargetArea>, velocity: readonly [number, number]) => {
	let isValid: boolean | null = null

	const probePosition = [0, 0]
	let iteration = 0
	let journey = []

	while (isValid === null) {
		probePosition[0] = probePosition[0] + Math.max(0, velocity[0] - iteration)
		probePosition[1] = probePosition[1] + velocity[1] - iteration

		if (
			probePosition[0] >= targetArea.x.min &&
			probePosition[0] <= targetArea.x.max &&
			probePosition[1] >= targetArea.y.min &&
			probePosition[1] <= targetArea.y.max
		)
			isValid = true
		else if (probePosition[0] > targetArea.x.max || probePosition[1] <= targetArea.y.min) isValid = false

		journey.push([probePosition[0], probePosition[1]])

		iteration++
	}

	return {
		journey,
		isValid,
		velocity,
	}
}

const run = async () => {
	const list = await readList('17.txt')

	const targetArea = getTargetArea(list[0])
	const validProbes = getValidProbes(targetArea)

	const highestProbe = validProbes.reduce<{ probe: ReturnType<typeof getProbe>; highestYValue: number } | undefined>(
		(highestProbe, probe) => {
			const highestYValue = Math.max(...probe.journey.map(([, y]) => y))

			if (highestYValue > (highestProbe?.highestYValue || 0)) {
				return {
					probe,
					highestYValue,
				}
			} else {
				return highestProbe
			}
		},
		undefined,
	)

	console.log(`The answer for 17a is: ${highestProbe?.highestYValue}`)
}

run()
