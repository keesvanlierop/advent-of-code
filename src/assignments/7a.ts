import { readList, run } from '@/utils'

export interface Bag {
	bagType: string
	containsBags: {
		quantity: number
		bagType: string
	}[]
}

const getBags = (list: string[]) => {
	return list.map((item) => {
		const [bagTypeRaw, contains] = item.split(' contain ')
		const bagType = bagTypeRaw.replace(/bags/g, 'bag')

		const containsBags = contains
			.replace('.', '')
			.replace(/bags/g, 'bag')
			.split(', ')
			.filter((bag) => bag !== 'no other bag')
			.map((bag) => ({
				quantity: Number(bag.substr(0, bag.indexOf(' '))),
				bagType: bag.substr(bag.indexOf(' ') + 1),
			}))

		return {
			bagType,
			containsBags,
		}
	})
}

const bagCanContain = (bag: Bag, bagType: string, allBags: Bag[]): boolean => {
	return (
		bag.containsBags.some((b) => b.bagType === bagType) ||
		bag.containsBags.some((b) => {
			const bag = allBags.find((bag) => b.bagType === bag.bagType)
			return bag && bagCanContain(bag, bagType, allBags)
		})
	)
}

const getBagsThatCanContain = (bags: Bag[], bagType: string) => {
	return bags.filter((bag) => bagCanContain(bag, bagType, bags))
}

const getAmountOfBagsThatCanContainShinyGoldBags = async () => {
	const list = await readList('7.txt')

	const bags = getBags(list)
	const bagsThatCanContainShinyGoldBags = getBagsThatCanContain(
		bags,
		'shiny gold bag',
	)

	return bagsThatCanContainShinyGoldBags.length
}

run('7a', getAmountOfBagsThatCanContainShinyGoldBags)
