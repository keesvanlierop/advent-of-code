import { readList } from '@/utils'

const PACKET_LENGTH = 4

const getStartOfPacket = (signal: string) => 
    signal.split('').findIndex((char, index) => {
        if (index < PACKET_LENGTH) return false
        const unique = [...Array(PACKET_LENGTH).keys()].reverse().map((i) => signal[index - i]).filter((item, index, self) => self.indexOf(item) === index);
        return unique.length === PACKET_LENGTH
    })


const run = async () => {
	const list = await readList('6.txt')

    const startOfPacket = getStartOfPacket(list[0])

	console.log(
		`The answer for 6a is: ${startOfPacket + 1}`,
	)
}

run()
