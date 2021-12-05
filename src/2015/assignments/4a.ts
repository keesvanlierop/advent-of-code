import MD5 from 'crypto-js/md5'

const getAnswerForInput = (input: string) => {
	let loop = 0

	while (true) {
		if (
			MD5(input + loop)
				.toString()
				.startsWith('00000')
		)
			return loop

		loop++
	}
}

const run = async () => {
	const input = 'yzbqklnj'

	const answer = getAnswerForInput(input)

	console.log(`The answer for 4a is: ${answer}`)
}

run()
