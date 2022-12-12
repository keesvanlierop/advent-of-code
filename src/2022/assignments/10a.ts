import { add, readList } from '@/utils'

const cycles: Record<number, number> = {}

let value = 1
let cycle = 0

const processList = (list: string[]) => list.forEach((item, index) => {
    cycle++
    cycles[cycle] = value

    const tick = processItem(item)

    if (typeof tick === 'number') {
        value += tick
        cycle++
        cycles[cycle] = value
    }
})

const processItem = (item: string) => {
    const [command, amount] = item.split(' ')

    if (command === 'addx') {
        return Number(amount)
    }
}

const getValueForCycle = (cycle: number) => {
    return (cycle + 1) * (cycles[cycle] || value)
}

const run = async () => {
	const list = await readList('10.txt')

    processList(list)

    console.log(cycles)

	console.log(
		`The answer for 10a is: ${add([getValueForCycle(19), getValueForCycle(59), getValueForCycle(99), getValueForCycle(139), getValueForCycle(179), getValueForCycle(219)])}`,
	)
}

run()
