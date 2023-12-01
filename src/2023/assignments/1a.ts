import { add, readList } from '@/utils'

const run = async () => {
	const list = await readList('1.txt')

	const calibrations = list.map(item => {
		const numbers = item.match(/\d/g)
		return Number(`${numbers?.[0]}${numbers?.[numbers?.length - 1]}`)
	})

	console.log(
		`The answer for 1a is: ${add(calibrations)}`,
	)
}

run()
