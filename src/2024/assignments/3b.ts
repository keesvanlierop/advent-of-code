import { add, multiply, readList } from '@/utils'

const MUL_PATTERN = /mul\(([\d]+),([\d]+)\)/

const run = async () => {
	const list = await readList('3.txt')

	const program = list.join('')

	const firstSection = program.split("don't()")[0]
	const doDontSections = program.split('do()')
	const doSections = doDontSections.slice(1, doDontSections.length).map((section) => section.split("don't")[0])

	const multiplyStatements = [firstSection, ...doSections].join('').match(new RegExp(MUL_PATTERN, 'g'))

	const multiplied = multiplyStatements?.map((statement) => {
		const [a, b] = statement.replace('mul(', '').replace(')', '').split(',').map(Number)
		return multiply([a, b])
	})

	console.log(`The answer for 3b is: ${add(multiplied || [])}`)
}

run()
