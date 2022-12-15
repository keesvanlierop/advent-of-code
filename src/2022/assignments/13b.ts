import { multiply, chunks, readList } from '@/utils'

type Value = number | number[]
type Pair = [Value, Value]

const getPairs = (list: string[]) => [...chunks(list, 3)].map(a => a.slice(0,2).map(i => eval(i))) as Pair[]

const isPairInRightOrder = (left: Value, right: Value): boolean | undefined => {
    if (typeof left === 'number' && typeof right === 'number') {
        if (left < right) return true
        else if (left > right) return false
    } else {
        const leftArray = Array.isArray(left) ? [...left] : [left]
        const rightArray = Array.isArray(right) ? [...right] : [right]

        let resolution: boolean | undefined = undefined

        while ((leftArray.length || rightArray.length) && typeof resolution !== 'boolean') {
            const nextLeftValue = leftArray.splice(0, 1)[0]
            const nextRightValue = rightArray.splice(0, 1)[0]

            if (typeof nextLeftValue === 'undefined') resolution = true
            if (typeof nextRightValue === 'undefined') resolution = false
        
            if (typeof resolution !== 'boolean') {
                resolution = isPairInRightOrder(nextLeftValue, nextRightValue)
            }
        }

        return resolution
    }

    return undefined
}

const run = async () => {
	const list = await readList('13.txt')

    const pairs =  [
        ...getPairs(list).flat(),
        [[2]],
        [[6]]
    ]

    // @ts-ignore
    const sorted = [...pairs].sort((a, b) => isPairInRightOrder(a, b) ? -1 : 1)

    const two = sorted.findIndex(v => JSON.stringify(v) === '[[2]]')
    const six = sorted.findIndex(v => JSON.stringify(v) === '[[6]]')

    console.log(JSON.stringify(sorted))

	console.log(
		`The answer for 13a is: ${multiply([two + 1, six + 1])}`,
	)
}

run()

