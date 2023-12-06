import { multiply, readList } from '@/utils'

interface Race {
    time: number
    recordToBeat: number
}
let race: Race

const getRaces = (list: string[]) => {
    const [,timeNumbersPart] = list[0].split('Time:')
    const [,recordsPart] = list[1].split('Distance:')
    const time = Number(timeNumbersPart.split(' ').filter(Number).join(''))
    const recordToBeat = Number(recordsPart.split(' ').filter(Number).join(''))

    race = {
        time,
        recordToBeat
    }
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

    const amountOfWaysToWin = getAmountOfWaysToWin(race)

	console.log(
		`The answer for 6a is: ${amountOfWaysToWin}`,
	)
}

run()
