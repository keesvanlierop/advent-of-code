import { regex, readList } from '@/utils'

interface State {
	map: Record<string, string[]>
	validPaths: string[][]
}

const getCaveState = (list: string[]) => {
	const state: State = {
		map: getMapFromList(list),
		validPaths: [],
	}

	let unclosedPaths = [['start']]

	while (unclosedPaths.length) {
		let newUnclosedPaths: string[][] = []

		unclosedPaths.forEach((openPath) => {
			const newOpenPathsForPath = state.map[openPath.slice(-1)[0]]
				.filter((point) => {
					if (point === 'end') state.validPaths.push([...openPath, 'end'])
					return point !== 'end' && !(regex.lowerCase.test(point) && openPath.includes(point))
				})
				.map((point) => [...openPath, point])

			newUnclosedPaths = newUnclosedPaths.concat(newOpenPathsForPath)
		})

		unclosedPaths = newUnclosedPaths
	}

	return state
}

const getMapFromList = (list: string[]) => {
	return list.reduce<Record<string, string[]>>((map, connection) => {
		const [left, right] = connection.split('-')
		return {
			...map,
			[left]: [...(map[left] || []), right],
			[right]: [...(map[right] || []), left],
		}
	}, {})
}

const run = async () => {
	const list = await readList('12.txt')

	const state = getCaveState(list)

	console.log(`The answer for 12a is: ${state.validPaths.length}`)
}

run()
