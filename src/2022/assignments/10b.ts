import { chunks, readList } from '@/utils'

const cycles: Record<number, '#' | '.'> = {}

let spritePosition: [number, number, number] = [0,1,2]

let value = 1
let cycle = 0

const processList = (list: string[]) => list.forEach((item, index) => {
    cycle++
    cycles[cycle] = spritePosition.includes(cycle % 40) ? '#' : '.'

    console.log(cycle, value)

    const tick = processItem(item)

    if (typeof tick === 'number') {
        value += tick
        spritePosition = [value - 1, value, value + 1]
        cycle++
        cycles[cycle] = spritePosition.includes(cycle % 40) ? '#' : '.'

        console.log(cycle, value)
    }
})

const processItem = (item: string) => {
    const [command, amount] = item.split(' ')

    if (command === 'addx') {
        return Number(amount)
    }
}

const run = async () => {
	const list = await readList('10.txt')

    processList(list)

	console.log(
		`The answer for 10b is:`,
	)
    const rows = [...chunks(Object.values(cycles), 40)]
    rows.forEach(row => console.log(row.join('')))

}

run()
