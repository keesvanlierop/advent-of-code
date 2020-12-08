import { add, chunkBy, readList, run } from '@/utils'

const getGroups = (list: string[]) => {
	return chunkBy(list, '').join(' ').split(' ')
}

const getAmountOfYesForGroup = (group: string) => {
	const amountOfCommas = group.split(',').length - 1
	const answers = group.replace(/,/g, '')
	return answers
		.split('')
		.filter(
			(a, i, self) =>
				self.filter((b) => a === b).length === amountOfCommas,
		)
		.filter((a, i, self) => i === self.indexOf(a)).length
}

const getAmountOfYes = async () => {
	const list = await readList('6.txt')
	const groups = getGroups(list)

	const amountOfYes = groups.map(getAmountOfYesForGroup)

	return add(amountOfYes)
}

run('6a', getAmountOfYes)
