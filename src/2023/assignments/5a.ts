import { add, readList } from '@/utils'

type Mapper = {
    next: string | undefined
    config: [number, number, number][]
}

let seeds: number[] = []
const maps: Record<string, Mapper> = {}

const analyzeList = (list: string[]) => {
    let current = 'seeds'
	while (list.length) {
        const item = list[0]
        if (item.includes('map:')) {
            const prev = current
            current = item
            const map = current.replace(' map:', '')
            const prevMap = prev.replace(' map:', '')
            if (maps[prevMap]) {
                maps[prevMap].next = map
            }
            maps[map] = {
                next: undefined,
                config: []
            }
        }

        if (current === 'seeds' && item) {
            const parts = item.split(': ')
            seeds = parts[1].split(' ').map(Number)
        } else if (item && item !== current) {
            const map = current.replace(' map:', '')
            maps[map].config.push(item.split(' ').map(Number) as [number, number, number])
        }

        list.shift()
    }
}

const getLocationNumberForSeed = (seed: number) => {
    let map: string | undefined = 'seed-to-soil'
    let location = seed

    while(map) {
        const matchingConfig = maps[map].config.find(config => location >= config[1] && location < config[1] + config[2])
        if (matchingConfig) {
            const deltaToSource = location - matchingConfig[1]
            location = matchingConfig[0] + deltaToSource
        }

        map = maps[map].next
    }

    return location
}

const run = async () => {
	const list = await readList('5.txt')

    analyzeList(list)

    const locationNumbersForSeeds = seeds.map(seed => getLocationNumberForSeed(seed))

	console.log(
		`The answer for 5a is: ${Math.min(...locationNumbersForSeeds)}`,
	)
}

run()
