// Monkey 0:
//   Starting items: 74, 64, 74, 63, 53
//   Operation: new = old * 7
//   Test: divisible by 5
//     If true: throw to monkey 1
//     If false: throw to monkey 6

import { chunks, multiply, readList } from '@/utils'

const AMOUNT_OF_ROWS = 10000
const REDUCE_WORRY_LEVEL = 1
let roundNumber = 1

type MonkeyInput = [string, string, string, string, string, string]
let lcm = BigInt(1)

const operators = {
    '+': (item: bigint, variantValue: bigint) => BigInt(eval(`${item.toString()} + ${variantValue.toString()}`)) % lcm,
    '*': (item: bigint, variantValue: bigint) => BigInt(eval(`${item.toString()} * ${variantValue.toString()}`)) % lcm,
}

const getMonkeys = (list: string[]) => [...chunks(list, 6)].map(chunk => getMonkey(chunk as MonkeyInput))
const getMonkey = (monkeyInput: MonkeyInput) => {
    const index = Number(monkeyInput[0].split(' ')[1].split(':')[0])
    const items = monkeyInput[1].replace(/^\s+|\s+$/gm,'').split(': ')[1].split(', ').map(BigInt)
    const amountOfThrows = 0

    const [,,,,operator,variant] = monkeyInput[2].replace(/^\s+|\s+$/gm,'').split(' ')

    const inspectItem = (item: bigint) => {
        const variantValue = getVariantValue(variant, item)
        return operators[operator as keyof typeof operators](item, variantValue)
    }

    const divisibleTest = BigInt(monkeyInput[3].replace(/^\s+|\s+$/gm,'').split(' by ')[1])
    const targetMonkeyIndexIfTrue = Number(monkeyInput[4].replace(/^\s+|\s+$/gm,'').split(' monkey ')[1])
    const targetMonkeyIndexIfFalse = Number(monkeyInput[5].replace(/^\s+|\s+$/gm,'').split(' monkey ')[1])
    const getTargetMonkey = (item: bigint) => item % divisibleTest === 0n
        ? targetMonkeyIndexIfTrue
        : targetMonkeyIndexIfFalse

    return {
        index,
        items,
        amountOfThrows,
        inspectItem,
        getTargetMonkey,
        divisibleTest
    }
}

const getVariantValue = (variant: string, item: bigint) => {
    if (variant === 'old') return item
    return BigInt(variant)
}

const runGame = (monkeys: (ReturnType<typeof getMonkey>[])) => {
    while (roundNumber <= AMOUNT_OF_ROWS) {
        doRound(monkeys)
        roundNumber++
    }
}

const doRound = (monkeys: ReturnType<typeof getMonkey>[]) => {
    monkeys.forEach(monkey => {
        monkey.items.forEach((item) => {
            const updatedItem = BigInt(monkey.inspectItem(item))
            const targetMonkeyIndex = monkey.getTargetMonkey(updatedItem)
            const targetMonkey = monkeys.find(monkey => monkey.index === targetMonkeyIndex)!
            targetMonkey.items.push(updatedItem)
            monkey.amountOfThrows++
        })
        monkey.items = []
    })
}


const run = async () => {
	const list = await readList('11.txt')

    const monkeys = getMonkeys(list)
    lcm = monkeys.map(monkey => monkey.divisibleTest).reduce((a, b) => a * b, BigInt(1));
    
    runGame(monkeys)

    const twoMostActiveMonkeys = [...monkeys].sort((a, b) => b.amountOfThrows - a.amountOfThrows).slice(0, 2).map(monkey => monkey.amountOfThrows)

	console.log(
		`The answer for 11a is: ${multiply(twoMostActiveMonkeys)}`,
	)
}

run()
