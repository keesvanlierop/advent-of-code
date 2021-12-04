import { readList } from '@/utils'

interface Board {
	rows: number[][]
	columns: number[][]
}

interface GameData {
	chosenNumbers: number[]
	boards: Board[]
}

const getGameDataFromList = (list: string[]): GameData => {
	const chosenNumbers = list.shift()?.split(',').map(Number) || []

	list.shift()

	const boards: Board[] = []
	let index = 0

	list.forEach((rowData) => {
		if (rowData) {
			if (!boards[index]) {
				boards[index] = {
					rows: [],
					columns: [],
				}
			}

			const row = rowData
				.split(' ')
				.filter((item) => item.length > 0)
				.map(Number)
			boards[index].rows.push(row)

			row.forEach((number, rowIndex) => {
				if (!boards[index].columns[rowIndex]) boards[index].columns[rowIndex] = []
				boards[index].columns[rowIndex].push(number)
			})
		} else {
			index++
		}
	})

	return {
		boards,
		chosenNumbers,
	}
}

const getWinningBoardData = (gameData: GameData) => {
	let winningBoard: Board | undefined
	let winningSequence: number[] = []

	gameData.chosenNumbers.forEach((_, i) => {
		if (winningBoard) return

		const chosenNumbersSequence = gameData.chosenNumbers.slice(0, i + 1)

		const hasWinningBoard = gameData.boards.find((board) => {
			const hasWiningRow = board.rows.find((row) => row.every((number) => chosenNumbersSequence.includes(number)))
			const hasWinningColumn = board.columns.find((column) => column.every((number) => chosenNumbersSequence.includes(number)))

			return hasWiningRow || hasWinningColumn
		})

		if (hasWinningBoard) {
			winningBoard = hasWinningBoard
			winningSequence = chosenNumbersSequence
		}
	})

	if (!winningBoard) {
		throw new Error('No winning board!')
	}

	return {
		winningBoard,
		winningSequence,
		winningNumber: winningSequence.slice(-1)?.[0],
		markedNumbers: winningBoard.rows
			.flat()
			.flat()
			.filter((number) => winningSequence.includes(number)),
		unmarkedNumbers: winningBoard.rows
			.flat()
			.flat()
			.filter((number) => !winningSequence.includes(number)),
	}
}

const run = async () => {
	const list = await readList('4.txt')

	const gameData = getGameDataFromList(list)
	const winningBoardData = getWinningBoardData(gameData)

	console.log(
		`The answer for 4a is: ${
			winningBoardData.unmarkedNumbers.reduce((total, number) => total + number, 0) * winningBoardData.winningNumber
		}`,
	)
}

run()
