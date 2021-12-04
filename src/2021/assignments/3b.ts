import { readList } from '@/utils'
import { stat } from 'fs'

const hasMoreOnesThanZerosForList = (list: string[], characterIndex: number) =>
	list.filter((item) => item[characterIndex] === '1').length >= list.length / 2

const getRates = (list: string[]) => {
	const state = {
		gamma: '',
		epsilon: '',
		oxygen: '',
		co2: '',
	}

	let oxygenList = [...list]
	let co2List = [...list]

	for (let i = 0; i < list[0].length; i++) {
		state.gamma = state.gamma + (hasMoreOnesThanZerosForList(list, i) ? '1' : '0')
		state.epsilon = state.epsilon + (hasMoreOnesThanZerosForList(list, i) ? '0' : '1')

		const oxygenValue = hasMoreOnesThanZerosForList(oxygenList, i) ? '1' : '0'
		oxygenList = oxygenList.filter((item) => item[i] === oxygenValue)
		state.oxygen = state.oxygen + oxygenValue

		const co2Value = co2List.length > 1 ? (hasMoreOnesThanZerosForList(co2List, i) ? '0' : '1') : co2List[0][i]
		co2List = co2List.filter((item) => item[i] === co2Value)
		state.co2 = state.co2 + co2Value
	}

	return {
		gamma: parseInt(state.gamma, 2),
		epsilon: parseInt(state.epsilon, 2),
		oxygen: parseInt(state.oxygen, 2),
		co2: parseInt(state.co2, 2),
	}
}

const run = async () => {
	const list = await readList('3.dummy.txt')

	const rates = getRates(list)

	console.log(rates)

	console.log(`The answer for 3b is: ${rates.oxygen * rates.co2}`)
}

run()
