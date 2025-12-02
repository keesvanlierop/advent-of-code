import { readList } from '@/utils'

const run = async () => {
	const list = await readList('1.txt')

	let position = 50
	let pointingAtZero = 0

	for (const command of list) {
		const value = Number(command.slice(1))

		if (command.startsWith('L')) {
			position = position - value < 0 ? (100 + ((position - value) % 100)) % 100 : position - value
		} else if (command.startsWith('R')) {
			position = (position + value) % 100
		}

		if (position === 0) {
			pointingAtZero += 1
		}
	}

	console.log(`The answer for 1a is: ${pointingAtZero}`)
}

run()
