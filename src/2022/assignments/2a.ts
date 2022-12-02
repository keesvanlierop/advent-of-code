import { add, readList } from '@/utils'

type Choice = 'ROCK' | 'PAPER' | 'SCISSORS'

const OpponentChoice = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS'
} as const

const MyChoice = {
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS'
} as const

const shapeScore = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3
} as const

enum Outcome {
    LOSS = 'LOSS',
    DRAW = 'DRAW',
    WIN = 'WIN'
}

const outcomeScore: Record<Outcome, number> = {
    LOSS: 0,
    DRAW: 3,
    WIN: 6
}



const getGames = (list: string[]) => {
	return list.map(game => {
        const [opponent, me] = game.split(' ') as [keyof typeof OpponentChoice, keyof typeof MyChoice]
        return {
            opponent: OpponentChoice[opponent],
            me: MyChoice[me]
        }
    })
}

const getScoresFromGames = (games: ReturnType<typeof getGames>) => {
    return games.map(game => {
        const shapeScoreForGame = shapeScore[game.me]
        const outcomeScoreForGame = outcomeScore[getGameResolution(game.opponent, game.me)]
        return shapeScoreForGame + outcomeScoreForGame
    })
}

const getGameResolution = (opponentsChoice: Choice, myChoice: Choice): Outcome => {
    switch (myChoice) {
        case 'ROCK':
            return opponentsChoice === 'ROCK' 
                ? Outcome.DRAW
                : opponentsChoice === 'PAPER'
                ? Outcome.LOSS
                : Outcome.WIN
        case 'PAPER':
            return opponentsChoice === 'PAPER' 
                ? Outcome.DRAW
                : opponentsChoice === 'SCISSORS'
                ? Outcome.LOSS
                : Outcome.WIN
        case 'SCISSORS':
            return opponentsChoice === 'SCISSORS' 
                ? Outcome.DRAW
                : opponentsChoice === 'ROCK'
                ? Outcome.LOSS
                : Outcome.WIN

    }
}

const run = async () => {
	const list = await readList('2.txt')

	const games = getGames(list)
	const scores = getScoresFromGames(games)

	console.log(
		`The answer for 2a is: ${scores.reduce((a,b) => a + b, 0)}`,
	)
}

run()
