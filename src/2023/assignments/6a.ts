import { multiply, readList } from '@/utils'

interface Race {
    time: number
    recordToBeat: number
}
const races: Race[] = []

const getRaces = (list: string[]) => {
    const [,timeNumbersPart] = list[0].split('Time:')
    const [,recordsPart] = list[1].split('Distance:')
    const times = timeNumbersPart.split(' ').filter(Number).map(Number)
    const recordsToBeat = recordsPart.split(' ').filter(Number).map(Number)

    times.forEach((time, i) => {
        races.push({
            time,
            recordToBeat: recordsToBeat[i]
        })
    })
}

const getAmountOfWaysToWin = (race: Race) => {
    let amountOfWaysToBeat = 0

    for (let attempt = 1; attempt < race.time; attempt++) {
        const distanceWithAttempt = (race.time - attempt) * attempt
        if (distanceWithAttempt > race.recordToBeat) amountOfWaysToBeat++
    }

    return amountOfWaysToBeat
}

const run = async () => {
	const list = await readList('6.txt')

	getRaces(list)

    const amountOfWaysToWinPerRace = races.map(race => getAmountOfWaysToWin(race))

	console.log(
		`The answer for 6a is: ${multiply(amountOfWaysToWinPerRace)}`,
	)
}

run()
