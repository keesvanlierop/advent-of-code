import { readList } from '@/utils'

const getOutcome = (list: string[]) => {
	return list.map((input) => {
		return [input, input.replace(/\\/g, '\\\\').replace(/"/g, '\\"')]
	})
}

const run = async () => {
	const list = await readList('8.txt', '2015')

	const outcome = getOutcome(list)

	console.log(
		`The answer for 8b is: ${outcome
			.map(([input, output]) => 2 + output.length - input.length)
			.reduce((total, difference) => total + difference, 0)}`,
	)
}

run()
