import { readList } from '@/utils'

enum SightDirection {
    TOP = 'TOP',
    RIGHT = 'RIGHT',
    BOTTOM = 'BOTTOM',
    LEFT = 'LEFT'
}

const visibleTrees = new Map<string, SightDirection[]>()

const getGrid = (list: string[]) => list.map(row => row.split('').map(Number))

const getVisibleTrees = (list: number[][]) => 
    Object.values(SightDirection)
        .forEach(direction => getVisibleTreesForDirection([...list], direction as SightDirection))

const getVisibleTreesForDirection = (list: number[][], direction: SightDirection) => {
    if (direction === SightDirection.LEFT) {
        list.forEach((row, index) => {
            let highestTree = -1
            row.forEach((tree, treeIndex) => {
                const coordinates = `${treeIndex},${index}`
                if (tree > highestTree) {
                    visibleTrees.set(coordinates, [
                        ...visibleTrees.get(coordinates) || [],
                        direction
                    ])
                    highestTree = tree
                }
            })
        })
    }
    if (direction === SightDirection.RIGHT) {
        list.forEach((row, index) => {
            let highestTree = -1
            const reversedRow = [...row].reverse()
            reversedRow.forEach((tree, treeIndex) => {
                const coordinates = `${row.length - 1 - treeIndex},${index}`
                if (tree > highestTree) {
                    visibleTrees.set(coordinates, [
                        ...visibleTrees.get(coordinates) || [],
                        direction
                    ])
                    highestTree = tree
                }
            })
        })
    }
    if (direction === SightDirection.TOP) {
        for (let i = 0; i < list[0].length; i++) {
            let highestTree = -1
            list.forEach((row, rowIndex) => {
                const coordinates = `${i},${rowIndex}`
                if (row[i] > highestTree) {
                    visibleTrees.set(coordinates, [
                        ...visibleTrees.get(coordinates) || [],
                        direction
                    ])
                    highestTree = row[i]
                }
            })
        }
    }
    if (direction === SightDirection.BOTTOM) {
        for (let i = 0; i < list[0].length; i++) {
            let highestTree = -1
            const reversedList = [...list].reverse()
            reversedList.forEach((row, rowIndex) => {
                const coordinates = `${i},${list.length - 1 - rowIndex}`
                if (row[i] > highestTree) {
                    visibleTrees.set(coordinates, [
                        ...visibleTrees.get(coordinates) || [],
                        direction
                    ])
                    highestTree = row[i]
                }
            })
        }
    }
}

const run = async () => {
	const list = await readList('8.txt')

    const grid = getGrid(list)
    getVisibleTrees(grid)

	console.log(
		`The answer for 8a is: ${Array.from(visibleTrees.keys()).length}`,
	)
}

run()
