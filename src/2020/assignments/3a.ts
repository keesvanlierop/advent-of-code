import { readList, run } from '@/utils'

const getAmountOfEncounteredTrees = async () => {
	const list = await readList('3.txt')

	const velocity = {
		x: 3,
		y: 1,
	}

	return list.reduce((amountOfEncounteredTrees, terrain, yPosition) => {
		const xPosition = velocity.x * yPosition
		const characterAtXPosition = terrain[xPosition % terrain.length]

		return amountOfEncounteredTrees + (characterAtXPosition === '#' ? 1 : 0)
	}, 0)
}

run('3a', getAmountOfEncounteredTrees)
