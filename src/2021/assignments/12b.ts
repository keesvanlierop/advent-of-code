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
					if (point === 'end' || point === 'start') return false
					if (!regex.lowerCase.test(point)) return true
					return pathCanGoToLowerCasePoint(openPath, point)
				})
				.map((point) => [...openPath, point])

			newUnclosedPaths = newUnclosedPaths.concat(newOpenPathsForPath)
		})

		unclosedPaths = newUnclosedPaths
	}

	return state
}

const pathCanGoToLowerCasePoint = (path: string[], point: string) => {
	const amountOfVisits = path.filter((p) => p === point).length
	if (!amountOfVisits) return true
	if (amountOfVisits > 1) return false

	const alreadyVisitedTwice = path.find((p) => p !== 'start' && regex.lowerCase.test(p) && path.filter((p2) => p === p2).length === 2)
	return !alreadyVisitedTwice
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

	console.log(`The answer for 12b is: ${state.validPaths.length}`)
}

run()
