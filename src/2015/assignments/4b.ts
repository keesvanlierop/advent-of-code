import MD5 from 'crypto-js/md5'

const getAnswerForInput = (input: string, condition: (hash: string) => boolean) => {
	let loop = 0

	while (true) {
		if (condition(MD5(input + loop).toString())) return loop
		loop++
	}
}

const run = async () => {
	const input = 'yzbqklnj'

	const answer = getAnswerForInput(input, (hash) => hash.startsWith('000000'))

	console.log(`The answer for 4b is: ${answer}`)
}

run()
