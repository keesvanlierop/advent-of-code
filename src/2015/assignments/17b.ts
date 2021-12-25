import { isEqual, readList } from '@/utils'

const getValidCombinations = (list: string[]) => {
	const containers = list.map(Number)

	const getValidCombinationForContainers = (
		subContainers: number[],
		validContainers: number[][] = [],
		sequence: number[] = [],
	): number[][] => {
		if (!subContainers.length) return validContainers

		for (let i = 0; i < subContainers.length; i++) {
			const updatedSequence = [...sequence, i + containers.length - subContainers.length]
			const volume = getVolume(updatedSequence)
			if (volume === 150) validContainers.push(updatedSequence)
			if (volume < 150)
				getValidCombinationForContainers(subContainers.slice(i + 1, subContainers.length), validContainers, updatedSequence)
		}

		return validContainers
	}

	const getVolume = (sequence: number[]) => sequence.reduce((total, index) => total + containers[index], 0)

	return containers
		.map((_, index, self) => self.slice(index, self.length))
		.map((containers) => getValidCombinationForContainers(containers))
		.flat()
		.filter((c, i, s) => i === s.findIndex((s) => isEqual(s, c)))
		.sort((a, b) => a.length - b.length)
		.filter((c, i, s) => c.length === s[0].length).length
}

const run = async () => {
	const list = await readList('17.txt', '2015')

	const minimumAmount = getValidCombinations(list)

	console.log(`The answer for 17b is: ${minimumAmount}`)
}

run()
