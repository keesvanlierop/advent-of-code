import { add, readList } from '@/utils'

type Choice = 'ROCK' | 'PAPER' | 'SCISSORS'

const OpponentChoice = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS'
} as const


enum Outcome {
    WIN = 'WIN',
    DRAW = 'DRAW',
    LOSS = 'LOSS'
}

const outcomes = {
    X: Outcome.LOSS,
    Y: Outcome.DRAW,
    Z: Outcome.WIN
} as const

const shapeScore = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3
} as const

const outcomeScore: Record<Outcome, number> = {
    LOSS: 0,
    DRAW: 3,
    WIN: 6
}



const getGames = (list: string[]) => {
	return list.map(game => {
        const [opponent, outcome] = game.split(' ') as [keyof typeof OpponentChoice, keyof typeof outcomes]
        return {
            opponent: OpponentChoice[opponent],
            outcome: outcomes[outcome]
        }
    })
}

const getScoresFromGames = (games: ReturnType<typeof getGames>) => {
    return games.map(game => {
        const shapeScoreForGame = shapeScore[getShapeScoreForMyOutcome(game.opponent, game.outcome)]
        const outcomeScoreForGame = outcomeScore[game.outcome]
        console.log(shapeScoreForGame, outcomeScoreForGame, game, getShapeScoreForMyOutcome(game.opponent, game.outcome))
        return shapeScoreForGame + outcomeScoreForGame
    })
}

const getShapeScoreForMyOutcome = (opponentsChoice: Choice, outcome: Outcome): Choice => {
    switch (opponentsChoice) {
        case 'ROCK':
            return outcome === Outcome.LOSS
                ? 'SCISSORS'
                : outcome === Outcome.DRAW
                ? 'ROCK'
                : 'PAPER'
        case 'PAPER':
            return outcome === Outcome.LOSS
                ? 'ROCK'
                : outcome === Outcome.DRAW
                ? 'PAPER'
                : 'SCISSORS'
        case 'SCISSORS':
            return outcome === Outcome.LOSS
                ? 'PAPER'
                : outcome === Outcome.DRAW
                ? 'SCISSORS'
                : 'ROCK'

    }
}

const run = async () => {
	const list = await readList('2.txt')

	const games = getGames(list)
	const scores = getScoresFromGames(games)

	console.log(
		`The answer for 2b is: ${scores.reduce((a,b) => a + b, 0)}`,
	)
}

run()
