import { add, readList } from '@/utils'

const numbersWithCoordinates = new Map<string, number>()
const symbols = new Map<string, string>()

const analyzeSchematic = (list: string[]) => {
    list.forEach((item, rowIndex) => {
        let current: any = {
            number: '',
            start: undefined,
            end: undefined,
        }
        let cellIndex = 0
        let cells = item.split('')
        
        while(cells.length) {
            if (!isNaN(Number(cells[0]))) {
                if (!current.number) {
                    current.start = [cellIndex, rowIndex]
                }

                current.number += cells[0]

                if (isNaN(Number(cells[1]))) {
                    numbersWithCoordinates.set(`${current.start[0]},${current.start[1]}`, Number(current.number))
                    current = {
                        number: '',
                        start: undefined,
                        end: undefined,
                    }
                }
            } else {
                if (cells[0] !== '.') {
                    symbols.set(`${cellIndex},${rowIndex}`, cells[0])
                }
            }

            cellIndex++;
            cells.shift()
        }
    })
}

const getPartNumbers = (list: string[]) => {
    let partNumbers: number[] = []

    for (let [key, value] of numbersWithCoordinates) {
        const split = key.split(',')
        const startX = Number(split[0])
        const startY = Number(split[1])
        const numberLength = String(value).length

        let hasMatch = false

        for (let x = startX - 1; x <= startX + numberLength; x++) {
            for (let y = startY - 1; y <= startY + 1; y++) {
                hasMatch = symbols.has(`${x},${y}`)
                if (hasMatch) {
                    partNumbers.push(value)
                    break;
                }
            }

            if (hasMatch) break
        }
    }

    return partNumbers
}

const run = async () => {
	const list = await readList('3.txt')

    analyzeSchematic(list)

    const partNumbers = getPartNumbers(list)

	console.log(
		`The answer for 3a is: ${add(partNumbers)}`,
	)
}

run()
