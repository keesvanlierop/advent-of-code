import { combine, readList } from '@/utils'

const weapons = [
	{
		name: 'dagger',
		cost: 8,
		damage: 4,
	},
	{
		name: 'shortsword',
		cost: 10,
		damage: 5,
	},
	{
		name: 'warhammer',
		cost: 25,
		damage: 6,
	},
	{
		name: 'longsword',
		cost: 40,
		damage: 7,
	},
	{
		name: 'greataxe',
		cost: 74,
		damage: 8,
	},
]

const armor = [
	{
		name: 'leather',
		cost: 13,
		armor: 1,
	},
	{
		name: 'chainmail',
		cost: 31,
		armor: 2,
	},
	{
		name: 'splintmail',
		cost: 53,
		armor: 3,
	},
	{
		name: 'bandedmail',
		cost: 75,
		armor: 4,
	},
	{
		name: 'platemail',
		cost: 102,
		armor: 5,
	},
]

const rings = [
	{
		name: 'damage1',
		isRing: true,
		cost: 25,
		damage: 1,
	},
	{
		name: 'damage2',
		isRing: true,
		cost: 50,
		damage: 2,
	},
	{
		name: 'damage3',
		isRing: true,
		cost: 100,
		damage: 3,
	},
	{
		name: 'defense1',
		isRing: true,
		cost: 20,
		armor: 1,
	},
	{
		name: 'defense2',
		isRing: true,
		cost: 40,
		armor: 2,
	},
	{
		name: 'defense3',
		isRing: true,
		cost: 80,
		armor: 3,
	},
]

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

const getWinnerForLoadout = (loadout: (ArrayElement<typeof weapons> | ArrayElement<typeof armor> | ArrayElement<typeof rings>)[]) => {
	const headToHead = {
		player: {
			hitPoints: 100,
			// @ts-ignore
			damage: loadout.filter((item) => item.damage).reduce((damage, item) => damage + item.damage, 0),
			// @ts-ignore
			armor: loadout.filter((item) => item.armor).reduce((armor, item) => armor + item.armor, 0),
		},
		boss: {
			hitPoints: 100,
			damage: 8,
			armor: 2,
		},
	}

	let nextPlayer: keyof typeof headToHead = 'player'

	while (headToHead.player.hitPoints > 0 && headToHead.boss.hitPoints > 0) {
		const attacker = nextPlayer === 'player' ? headToHead.player : headToHead.boss
		const defender = nextPlayer === 'player' ? headToHead.boss : headToHead.player

		const damageDone = Math.max(attacker.damage - defender.armor, 1)
		defender.hitPoints = defender.hitPoints - damageDone

		nextPlayer = nextPlayer === 'player' ? 'boss' : 'player'
	}

	return headToHead.player.hitPoints <= 0 ? 'boss' : 'player'
}

const run = async () => {
	const combinations = combine([...armor, ...rings], 2)

	const mostExpensiveLosingLoadout = weapons
		// Maps to all possible loadout combinations per weapon
		.flatMap((weapon) => {
			const combinationsForWeapon = combinations.filter(
				(combination) => combination.filter((item) => 'isRing' in item && item.isRing).length <= 2,
			)
			return combinationsForWeapon.map((combination) => [weapon, ...combination])
		})
		// Get loadouts that lose from the boss
		.filter((loadout) => getWinnerForLoadout(loadout) === 'boss')
		// Get most expensive loadout
		.reduce((mostExpensiveLoadout, loadout) => {
			const costOfLoadout = loadout.reduce((total, item) => total + item.cost, 0)
			return Math.max(costOfLoadout, mostExpensiveLoadout)
		}, 0)

	console.log(`The answer for 21b is: ${mostExpensiveLosingLoadout}`)
}

run()
