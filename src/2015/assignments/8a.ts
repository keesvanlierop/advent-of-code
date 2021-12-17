import { readList } from '@/utils'

const getOutcome = (list: string[]) => {
	return list.map((input) => {
		return [input, eval(input)]
	})
}

const run = async () => {
	const list = await readList('8.txt', '2015')

	const outcome = getOutcome(list)

	console.log(
		`The answer for 8a is: ${outcome
			.map(([input, output]) => input.length - output.length)
			.reduce((total, difference) => total + difference, 0)}`,
	)
}

run()
