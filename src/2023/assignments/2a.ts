
import { add, readList } from '@/utils'

const gameConfig = {
    red: 12,
    green: 13,
    blue: 14,
}

const isPossibleGame = (gameId: string, sets: Record<string, number>[]) => {
    const game = { ...gameConfig }
    return sets.every(set => game.red >= (set.red || 0) && game.green >= (set.green || 0) && game.blue >= (set.blue || 0))
}

const run = async () => {
	const list = await readList('2.txt')

	const possibleGames = list
        .filter(item => {
            const parts = item.split(': ')
            const sets = parts[1].split('; ').map(item => {
                const grabs = item.split(', ')
                return Object.fromEntries(grabs.map(grab => {
                    const [amount, color] = grab.split(' ')
                    return [color.replace(',', ''), Number(amount)]
                }))
            })
            return isPossibleGame(parts[0], sets)
        })
        .map(item => {
            const parts = item.split(':')
            return Number(parts[0].split(' ')[1])
        })

	console.log(
		`The answer for 2a is: ${add(possibleGames)}`,
	)
}

run()
