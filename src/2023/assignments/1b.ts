import { add, readList } from '@/utils'

const toNumber = (input: string | undefined) => {
    if (input && isNaN(Number(input))) {
        return {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
        }[input]
    } else {
        return input
    }
}

const run = async () => {
	const list = await readList('1.txt')

	const calibrations = list.map(item => {
		const digits = item.split('')
            .map((digit, index) => {
                const string = item.slice(index)
                if (string.startsWith('one')) return 1
                if (string.startsWith('two')) return 2
                if (string.startsWith('three')) return 3
                if (string.startsWith('four')) return 4
                if (string.startsWith('five')) return 5
                if (string.startsWith('six')) return 6
                if (string.startsWith('seven')) return 7
                if (string.startsWith('eight')) return 8
                if (string.startsWith('nine')) return 9
                return parseInt(digit)
            })
            .filter(Boolean)
        return Number('' + digits[0] + digits[digits.length - 1])
	})

	console.log(
		`The answer for 1b is: ${add(calibrations)}`,
	)
}

run()
