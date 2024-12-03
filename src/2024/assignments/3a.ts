import { add, multiply, readList } from '@/utils'

const MUL_PATTERN = /mul\(([\d]+),([\d]+)\)/

const run = async () => {
	const list = await readList('3.txt')

	const program = list.join('')

	const multiplyStatements = program.match(new RegExp(MUL_PATTERN, 'g'))

	const multiplied = multiplyStatements?.map((statement) => {
		const [a, b] = statement.replace('mul(', '').replace(')', '').split(',').map(Number)
		return multiply([a, b])
	})

	console.log(`The answer for 3a is: ${add(multiplied || [])}`)
}

run()
