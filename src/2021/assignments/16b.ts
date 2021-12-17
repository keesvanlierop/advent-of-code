import { readList } from '@/utils'

interface Packet {
	packetString: string
	version: number
	type: PacketType
	value: number
	remaining: string
	subPackets: Packet[]
}

enum PacketType {
	SUM = 0,
	PRODUCT = 1,
	MINIMUM = 2,
	MAXIMUM = 3,
	LITERAL = 4,
	GREATER_THAN = 5,
	LESS_THAN = 6,
	EQUAL_TO = 7,
}

const binaryMap = {
	'0': '0000',
	'1': '0001',
	'2': '0010',
	'3': '0011',
	'4': '0100',
	'5': '0101',
	'6': '0110',
	'7': '0111',
	'8': '1000',
	'9': '1001',
	A: '1010',
	B: '1011',
	C: '1100',
	D: '1101',
	E: '1110',
	F: '1111',
}

const toBinary = (string: string) => {
	return string
		.split('')
		.map((character) => binaryMap[character as keyof typeof binaryMap] || '')
		.join('')
}

const getPacket = (packetString: string): Packet => {
	const typeId = parseInt(packetString.slice(3, 6), 2)
	return typeId === 4 ? getPacketWithLiteralValue(packetString) : getPacketWithOperator(packetString)
}

const getPacketWithLiteralValue = (packetString: string): Packet => {
	const version = parseInt(packetString.slice(0, 3), 2)
	const type = parseInt(packetString.slice(3, 6), 2) as PacketType
	const { value, remaining } = getLiteralValue(packetString.slice(6, packetString.length))

	return {
		packetString,
		version,
		type,
		value,
		remaining,
		subPackets: [],
	}
}

const getLiteralValue = (literalValueData: string) => {
	let remaining = literalValueData
	let isDone = false
	let literalValue = ''

	while (!isDone) {
		const chunk = remaining.slice(0, 5)
		if (chunk.startsWith('0')) isDone = true
		literalValue = literalValue + chunk[1] + chunk[2] + chunk[3] + chunk[4]
		remaining = remaining.substring(5, remaining.length)
	}

	return {
		value: parseInt(literalValue, 2),
		remaining,
	}
}

const getPacketWithOperator = (packetString: string): Packet => {
	const version = parseInt(packetString.slice(0, 3), 2)
	const type = parseInt(packetString.slice(3, 6), 2) as PacketType
	const lengthTypeId = parseInt(packetString.slice(6, 7), 2)

	const labelLength = lengthTypeId === 1 ? 11 : 15
	const endOfLabelPosition = 7 + labelLength
	const label = parseInt(packetString.slice(7, endOfLabelPosition), 2)
	const subPackets: Packet[] = []

	let remaining = packetString.slice(endOfLabelPosition, packetString.length)

	if (lengthTypeId === 1) {
		for (let i = 0; i < (label || 0); i++) {
			const subPacket = getPacket(remaining)
			remaining = subPacket.remaining
			subPackets.push(subPacket)
		}
	} else {
		let usedCharacters = 0

		while (usedCharacters < label) {
			const subPacket = getPacket(remaining)
			usedCharacters += remaining.length - subPacket.remaining.length
			remaining = subPacket.remaining
			subPackets.push(subPacket)
		}
	}

	const value = getValueByType(subPackets, type)

	return {
		packetString,
		version,
		type,
		value,
		subPackets,
		remaining,
	}
}

const getValueByType = (subPackets: Packet[], type: PacketType): number => {
	switch (type) {
		case PacketType.SUM:
			return subPackets.reduce((total, packet) => total + packet.value, 0)
		case PacketType.PRODUCT:
			return subPackets.reduce((total, packet) => total * packet.value, 1)
		case PacketType.MINIMUM:
			return Math.min(...subPackets.map((packet) => packet.value))
		case PacketType.MAXIMUM:
			return Math.max(...subPackets.map((packet) => packet.value))
		case PacketType.GREATER_THAN:
			return subPackets[0].value > subPackets[1].value ? 1 : 0
		case PacketType.LESS_THAN:
			return subPackets[0].value < subPackets[1].value ? 1 : 0
		case PacketType.EQUAL_TO:
			return subPackets[0].value === subPackets[1].value ? 1 : 0
	}

	return 0
}

const run = async () => {
	const hexadecimalString = await readList('16.txt')
	const packetString = toBinary(hexadecimalString[0])

	const packet = getPacket(packetString)
	console.log(JSON.stringify(packet, null, 4))

	console.log(`The answer for 16b is: ${packet.value}`)
}

run()
