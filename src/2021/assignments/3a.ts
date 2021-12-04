import { readList } from '@/utils'

const getRates = (list: string[]) => {
	const state = {
		gamma: '',
		epsilon: '',
	}

	for (let i = 0; i < list[0].length; i++) {
		const hasMoreOnesThanZeros = list.filter((item) => item[i] === '1').length > list.length / 2

		const gamma = hasMoreOnesThanZeros ? '1' : '0'
		const epsilon = hasMoreOnesThanZeros ? '0' : '1'

		state.gamma = state.gamma + gamma
		state.epsilon = state.epsilon + epsilon
	}

	return {
		gamma: parseInt(state.gamma, 2),
		epsilon: parseInt(state.epsilon, 2),
	}
}

const run = async () => {
	const list = await readList('3.txt')

	const rates = getRates(list)

	console.log(`The answer for 3a is: ${rates.gamma * rates.epsilon}`)
}

run()
