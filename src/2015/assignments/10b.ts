import { readList } from '@/utils'

const lookAndSay = (input: string, iterate = 1): string => {
	if (!iterate) return input

	const output = input
		.split('')
		.reduce<[string, number][]>((list, number) => {
			if (!list.length) {
				list[0] = [number, 1]
				return list
			}

			const lastItem = list[list.length - 1]
			if (lastItem[0] === number) {
				list[list.length - 1][1] += 1
			} else {
				list.push([number, 1])
			}

			return list
		}, [])
		.map(([number, amount]) => `${amount}${number}`)
		.join('')

	return lookAndSay(output, iterate - 1)
}

const run = async () => {
	const list = await readList('10.txt', '2015')

	const output = lookAndSay(list[0], 50)

	console.log(`The answer for 10b is: ${output.length}`)
}

run()
