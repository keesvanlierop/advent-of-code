import { readList } from '@/utils'

const PROCEDURE_REGEX = /move (\d+) from (\d+) to (\d+)/

interface Procedure {
    move: number
    from: number
    to: number
}

const getCratesAndProcedure = (list: string[]) => {
    const dividerIndex = list.findIndex(item => !item)
    const stackIndices = list[dividerIndex-1].replace(/ /g, '').length;
    const stacks = Array.from(Array(stackIndices).keys()).map(_ => [] as string[])
    
    for (let i = dividerIndex - 2; i >= 0; i--) {
        let iteree = 0
        for (let y = 1; y <= list[i].length; y += 4) {
            if (!stacks[iteree]) stacks[iteree] = []
            if (list[i][y].replace(/ /g, '')) stacks[iteree].push(list[i][y])
            iteree++
        }
    }

    const procedures: Procedure[] = []

    for (let i = dividerIndex + 1; i <= list.length - 1; i++) {
        const parts = list[i].match(PROCEDURE_REGEX) || []
        procedures.push({
            move: Number(parts[1]),
            from: Number(parts[2]),
            to: Number(parts[3]),
        })
    }

    return {
        stacks,
        procedures
    }
}

const getStacksAfterProcedures = (stacks: string[][], procedures: Procedure[]) => {
    procedures.forEach(procedure => {
        for (let i = 1; i <= procedure.move; i++) {
            if (stacks[procedure.from - 1]) {
                const crate = stacks[procedure.from - 1].pop()
                stacks[procedure.to - 1].push(crate!)
            }
        }
    })

    return stacks
}

const run = async () => {
	const list = await readList('5.txt')

	const cratesAndProcedures = getCratesAndProcedure(list)
    const stacksAfterProcedures = getStacksAfterProcedures(cratesAndProcedures.stacks, cratesAndProcedures.procedures)

	console.log(
		`The answer for 5a is: ${[...stacksAfterProcedures].map(stack => stack.pop()).join('')}`,
	)
}

run()
