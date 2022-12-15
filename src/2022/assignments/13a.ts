import { add, chunks, readList } from '@/utils'

type Value = number | number[]
type Pair = [Value, Value]

const getPairs = (list: string[]) => [...chunks(list, 3)].map(a => a.slice(0,2).map(i => eval(i))) as Pair[]

const getCompareResultsForPairs = (list: string[], pairs: Pair[]): Record<number, { pair: [string, string], result: boolean, index: number }> => {
    return pairs.reduce(
        (compareResults, pair, index) => ({
            ...compareResults,
            [index]: {
                pair: [
                    list[index * 3],
                    list[index * 3 + 1]
                ],
                result: isPairInRightOrder(pair[0], pair[1]),
                index: index + 1
            }
        }),
        {}
    )
}

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

    const pairs = getPairs(list)

    const compareResults = getCompareResultsForPairs(list, pairs)
    
    const validPairIndices = Object.values(compareResults)
        .filter(result => result.result)
        .map(result => result.index)

	console.log(
		`The answer for 13a is: ${add(validPairIndices)}`,
	)
}

run()
