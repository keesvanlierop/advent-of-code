// Monkey 0:
//   Starting items: 74, 64, 74, 63, 53
//   Operation: new = old * 7
//   Test: divisible by 5
//     If true: throw to monkey 1
//     If false: throw to monkey 6

import { chunks, multiply, readList } from '@/utils'

const AMOUNT_OF_ROWS = 20
let roundNumber = 1

type MonkeyInput = [string, string, string, string, string, string]

const getMonkeys = (list: string[]) => [...chunks(list, 6)].map(chunk => getMonkey(chunk as MonkeyInput))
const getMonkey = (monkeyInput: MonkeyInput) => {
    const index = Number(monkeyInput[0].split(' ')[1].split(':')[0])
    const items = monkeyInput[1].replace(/^\s+|\s+$/gm,'').split(': ')[1].split(', ').map(Number)
    const amountOfThrows = 0

    const [,,,,operator,variant] = monkeyInput[2].replace(/^\s+|\s+$/gm,'').split(' ')
    const inspectItem = (item: number) => {
        const variantValue = getVariantValue(variant, item)

        switch (operator) {
            case '+':
                return Math.floor((item + variantValue) / 3)
            case '*':
                return Math.floor((item * variantValue) / 3)
        }

        return item
    }

    const divisibleTest = Number(monkeyInput[3].replace(/^\s+|\s+$/gm,'').split(' by ')[1])
    const targetMonkeyIndexIfTrue = Number(monkeyInput[4].replace(/^\s+|\s+$/gm,'').split(' monkey ')[1])
    const targetMonkeyIndexIfFalse = Number(monkeyInput[5].replace(/^\s+|\s+$/gm,'').split(' monkey ')[1])
    const getTargetMonkey = (item: number) => item % divisibleTest === 0
        ? targetMonkeyIndexIfTrue
        : targetMonkeyIndexIfFalse

    return {
        index,
        items,
        amountOfThrows,
        inspectItem,
        getTargetMonkey
    }
}

const getVariantValue = (variant: string, item: number) => {
    if (variant === 'old') return item
    return Number(variant)
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
            const updatedItem = monkey.inspectItem(item)
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
    
    runGame(monkeys)

    const twoMostActiveMonkeys = [...monkeys].sort((a, b) => b.amountOfThrows - a.amountOfThrows).slice(0, 2).map(monkey => monkey.amountOfThrows)



	console.log(
		`The answer for 11a is: ${multiply(twoMostActiveMonkeys)}`,
	)
}

run()
