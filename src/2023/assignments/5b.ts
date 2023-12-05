import { readList } from '@/utils'

type Mapper = {
    next: string | undefined
    config: [number, number, number][]
}

let seeds: [number, number][] = []
const maps: Record<string, Mapper> = {}

function chunkArray(array: any[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

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
            const seedConfig = parts[1].split(' ').map(Number)
            seeds = chunkArray(seedConfig, 2) as [number, number][]
        } else if (item && item !== current) {
            const map = current.replace(' map:', '')
            maps[map].config.push(item.split(' ').map(Number) as [number, number, number])
        }

        list.shift()
    }
}

const getLocationNumberForSeedConfig = (seedConfig: number[]) => {
    let lowestLocation = Infinity

    for (let x = 0; x < seedConfig[1]; x++) {
        let map: string | undefined = 'seed-to-soil'
        let location = seedConfig[0] + x

        while(map) {
            const matchingConfig = maps[map].config.find(config => location >= config[1] && location < config[1] + config[2])
            if (matchingConfig) {
                const deltaToSource = location - matchingConfig[1]
                location = matchingConfig[0] + deltaToSource
            }

            map = maps[map].next
        }

        if (location < lowestLocation) {
            lowestLocation = location
        }
    }

    return lowestLocation
}

const run = async () => {
	const list = await readList('5.txt')

    analyzeList(list)

    const locationNumbersForSeeds = seeds.map((seedConfig, index) => {
        return getLocationNumberForSeedConfig(seedConfig)
    })

	console.log(
		`The answer for 5b is: ${Math.min(...locationNumbersForSeeds)}`,
	)
}

run()
