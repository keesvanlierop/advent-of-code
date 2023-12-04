import { add, readList } from '@/utils'

const run = async () => {
	const list = await readList('4.txt')

	const cards = list.map(card => {
        const [game, numbers] = card.split(':')
        const [winningNumberSequence, cardNumberSequence] = numbers.split('|')
        const winningNumbers = winningNumberSequence.match(/\d+/g)
        const cardNumbers = cardNumberSequence.match(/\d+/g)
        const cardIds = game.match(/\d+/g)
        return [
            Number(cardIds?.[0]),
            winningNumbers?.map(Number), 
            cardNumbers?.map(Number)
        ] as const
    })

    const amountOfScratchCards: Record<number, number> = cards.reduce(
        (record, card) => ({
            ...record,
            [card[0]]: 1
        }),
        {}
    )

    cards.forEach(([cardId, winningNumbers, cardNumbers]) => {
        const amountOfWinningNumbers = winningNumbers?.filter(winningNumber => cardNumbers?.includes(winningNumber)).length || 0
        const amountOfCards = amountOfScratchCards[cardId]
        
        for (let i = 1; i <= amountOfWinningNumbers; i++) {
            amountOfScratchCards[cardId + i] += 1 * amountOfCards
        }
    })

	console.log(
		`The answer for 4b is: ${add(Object.values(amountOfScratchCards))}`,
	)
}

run()
