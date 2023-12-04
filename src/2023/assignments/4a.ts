import { add, readList } from '@/utils'

const run = async () => {
	const list = await readList('4.txt')

	const cards = list.map(card => {
        const [, numbers] = card.split(':')
        const [winningNumberSequence, cardNumberSequence] = numbers.split('|')
        const winningNumbers = winningNumberSequence.match(/\d+/g)
        const cardNumbers = cardNumberSequence.match(/\d+/g)
        return [
            winningNumbers?.map(Number), 
            cardNumbers?.map(Number)
        ]
    })

    const scores = cards.map(([winningNumbers, cardNumbers]) => {
        const amountOfWinningNumbers = winningNumbers?.filter(winningNumber => cardNumbers?.includes(winningNumber)).length || 0
        return amountOfWinningNumbers ? Math.pow(2, amountOfWinningNumbers - 1) : 0
    })

	console.log(
		`The answer for 4a is: ${add(scores)}`,
	)
}

run()
