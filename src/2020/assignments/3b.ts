import { multiply, readList, run } from '@/utils'

export interface Velocity {
	x: number
	y: number
}

const calculateAmountOfEncounteredTreesByVelocity = (
	list: string[],
	velocity: Velocity,
) => {
	return (
		list
			// Skip some rows if the y velocity is faster than 1 index per iteration
			.filter((_terrain, index) => index % velocity.y === 0)
			.reduce((amountOfEncounteredTrees, terrain, yPosition) => {
				const xPosition = velocity.x * yPosition
				const characterAtXPosition = terrain[xPosition % terrain.length]

				return (
					amountOfEncounteredTrees +
					(characterAtXPosition === '#' ? 1 : 0)
				)
			}, 0)
	)
}

const getAmountOfEncounteredTrees = async () => {
	const list = await readList('3.txt')

	const velocities: Velocity[] = [
		{ x: 1, y: 1 },
		{ x: 3, y: 1 },
		{ x: 5, y: 1 },
		{ x: 7, y: 1 },
		{ x: 1, y: 2 },
	]

	const amountOfEncounteredTreesForVelocities = velocities.map((velocity) =>
		calculateAmountOfEncounteredTreesByVelocity(list, velocity),
	)

	console.log(
		'amountOfEncounteredTreesForVelocities',
		amountOfEncounteredTreesForVelocities,
	)

	return multiply(amountOfEncounteredTreesForVelocities)
}

run('3b', getAmountOfEncounteredTrees)
