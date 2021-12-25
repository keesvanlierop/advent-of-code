const getLowestHouseNumber = (presents: number) => {
	for (let i = 700000; i <= presents; i++) {
		const presentsForHouseNumber = getPresentsForHouseNumber(i)
		if (presentsForHouseNumber >= presents) return i
		console.log(i, presentsForHouseNumber)
	}
}

const getPresentsForHouseNumber = (houseNumber: number) => {
	let amountOfPresents = 0
	for (let i = 1; i <= houseNumber; i++) {
		if (houseNumber % i === 0 && houseNumber <= i * 50) {
			amountOfPresents += i * 11
		}
	}
	return amountOfPresents
}

const run = async () => {
	const input = 29000000

	const lowestHouseNumber = getLowestHouseNumber(input)

	console.log(`The answer for 20b is: ${lowestHouseNumber}`)
}

run()
