import { add, fromBinary, readList, run, toBinary } from '@/utils'

const applyMaskToValue = (mask: string, value: number) => {
	const binary = toBinary(value)

	const result = mask
		.split('')
		.map((value, index) => (value === 'X' ? binary[index] : value))
		.join('')

	return fromBinary(result)
}

const getSum = async () => {
	const list = await readList('14.txt')

	let currentMask = ''
	let currentIndex = 0
	const results: Record<number, number> = {}

	while (list[currentIndex]) {
		const entry = list[currentIndex]

		if (entry.startsWith('mask =')) {
			currentMask = entry.replace('mask = ', '')
		} else {
			const address = Number(entry.split('[')[1].split(']')[0])
			const value = Number(entry.split(' = ')[1])
			results[address] = applyMaskToValue(currentMask, value)
		}

		currentIndex++
	}

	console.log(results)

	return add(Object.values(results))
}

run('14a', getSum)
