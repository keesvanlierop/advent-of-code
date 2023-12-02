
import { add, multiply, readList } from '@/utils'

const gameConfig = {
    red: 12,
    green: 13,
    blue: 14,
}

const getLowestGameConfig = (gameId: string, sets: Record<string, number>[]) => {
    return {
        reds: Math.max(...sets.filter(set => set.red).map(set => set.red)),
        greens: Math.max(...sets.filter(set => set.green).map(set => set.green)),
        blues: Math.max(...sets.filter(set => set.blue).map(set => set.blue)),
    }
}

const run = async () => {
	const list = await readList('2.txt')

	const gameConfigs = list
        .map(item => {
            const parts = item.split(': ')
            const sets = parts[1].split('; ').map(item => {
                const grabs = item.split(', ')
                return Object.fromEntries(grabs.map(grab => {
                    const [amount, color] = grab.split(' ')
                    return [color.replace(',', ''), Number(amount)]
                }))
            })
            return getLowestGameConfig(parts[0], sets)
        })
        .map(config => multiply(Object.values(config)))

	console.log(
		`The answer for 2b is: ${add(gameConfigs)}`,
	)
}

run()
