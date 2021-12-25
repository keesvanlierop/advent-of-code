import { readList } from '@/utils'

const INGEREDIENT_REGEX = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/

const getCookiesResult = (list: string[]) => {
	const ingredients = list.map((ingredient) => {
		const parts = ingredient.match(INGEREDIENT_REGEX)
		return {
			name: parts?.[1],
			capacity: Number(parts?.[2]),
			durability: Number(parts?.[3]),
			flavor: Number(parts?.[4]),
			texture: Number(parts?.[5]),
			calories: Number(parts?.[6]),
		}
	})

	let highestScore = 0

	for (let i = 1; i < 100; i++) {
		const remainingI = 100 - i

		for (let j = 1; j < remainingI; j++) {
			const remainingIJ = remainingI - j

			for (let k = 0; k < remainingIJ; k++) {
				const l = remainingIJ - k
				const score =
					Math.max(
						0,
						ingredients[0].capacity * i +
							ingredients[1].capacity * j +
							ingredients[2].capacity * k +
							ingredients[3].capacity * l,
					) *
					Math.max(
						0,
						ingredients[0].durability * i +
							ingredients[1].durability * j +
							ingredients[2].durability * k +
							ingredients[3].durability * l,
					) *
					Math.max(
						0,
						ingredients[0].flavor * i + ingredients[1].flavor * j + ingredients[2].flavor * k + ingredients[3].flavor * l,
					) *
					Math.max(
						0,
						ingredients[0].texture * i + ingredients[1].texture * j + ingredients[2].texture * k + ingredients[3].texture * l,
					)

				const amountOfCalories =
					ingredients[0].calories * i + ingredients[1].calories * j + ingredients[2].calories * k + ingredients[3].calories * l

				if (amountOfCalories === 500) {
					highestScore = Math.max(highestScore, score)
				}
			}
		}
	}

	return highestScore
}

const run = async () => {
	const list = await readList('15.txt', '2015')

	const score = getCookiesResult(list)

	console.log(`The answer for 15b is: ${score}`)
}

run()
