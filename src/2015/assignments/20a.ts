const getLowestHouseNumber = (presents: number) => {
	for (let i = 1; i <= presents; i++) {
		const presentsForHouseNumber = getPresentsForHouseNumber(i)
		if (presentsForHouseNumber >= presents) return i
	}
}

const getPresentsForHouseNumber = (houseNumber: number) => {
	let amountOfPresents = 0
	for (let i = 1; i <= houseNumber; i++) {
		if (houseNumber % i === 0) {
			amountOfPresents += i * 10
		}
	}
	return amountOfPresents
}

const run = async () => {
	const input = 29000000

	const lowestHouseNumber = getLowestHouseNumber(input)

	console.log(`The answer for 20a is: ${lowestHouseNumber}`)
}

run()
