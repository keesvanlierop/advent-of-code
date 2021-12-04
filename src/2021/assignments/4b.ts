import { readList } from '@/utils'

interface Board {
	id: string
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
					id: `board-${index + 1}`,
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

const getBoardsData = (gameData: GameData) => {
	let boardsThatAlreadyWon: Board[] = []
	let winningBoard: Board | undefined
	let winningSequence: number[] = []

	let losingBoard: Board | undefined
	let losingSequence: number[] = []

	gameData.chosenNumbers.forEach((_, i) => {
		const chosenNumbersSequence = gameData.chosenNumbers.slice(0, i + 1)

		const winningBoardsForSequence = gameData.boards.filter((board) => {
			const hasWiningRow = board.rows.find((row) => row.every((number) => chosenNumbersSequence.includes(number)))
			const hasWinningColumn = board.columns.find((column) => column.every((number) => chosenNumbersSequence.includes(number)))
			return hasWiningRow || hasWinningColumn
		})

		if (winningBoardsForSequence.length > 0) {
			if (winningBoardsForSequence.length === 1 && !winningBoard) {
				winningBoard = winningBoardsForSequence[0]
				winningSequence = chosenNumbersSequence
			}

			if (winningBoardsForSequence.length === gameData.boards.length && !losingBoard) {
				losingBoard = winningBoardsForSequence.find((board) => !boardsThatAlreadyWon.some((b) => b.id === board.id))
				losingSequence = chosenNumbersSequence
			}

			boardsThatAlreadyWon = winningBoardsForSequence
		}
	})

	if (!winningBoard || !losingBoard) {
		throw new Error('Board data corrupt!')
	}

	return {
		win: createGameResultData(winningBoard, winningSequence),
		lose: createGameResultData(losingBoard, losingSequence),
	}
}

const createGameResultData = (board: Board, sequence: number[]) => {
	return {
		board,
		score:
			board.rows
				.flat()
				.flat()
				.filter((number) => !sequence.includes(number))
				.reduce((total, number) => total + number, 0) * sequence.slice(-1)?.[0],
	}
}

const run = async () => {
	const list = await readList('4.txt')

	const gameData = getGameDataFromList(list)
	const boardsData = getBoardsData(gameData)

	console.log(`The answer for 4b is: ${boardsData.lose.score}`)
}

run()
