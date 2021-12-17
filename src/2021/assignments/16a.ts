import { readList } from '@/utils'

type AnyPacket = PacketWithLiteralValue | PacketWithOperator

interface PacketBaseData {
	packetString: string
	version: number
	typeId: number
	remaining: string
}

interface PacketWithLiteralValue extends PacketBaseData {
	__type: 'LiteralValue'
	literalValue: number
}

interface PacketWithOperator extends PacketBaseData {
	__type: 'Operator'
	lengthTypeId: number
	subPackets: AnyPacket[]
	label: number
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

const getPacket = (packetString: string): AnyPacket => {
	const typeId = parseInt(packetString.slice(3, 6), 2)
	return typeId === 4 ? getPacketWithLiteralValue(packetString) : getPacketWithOperator(packetString)
}

const getPacketWithLiteralValue = (packetString: string): PacketWithLiteralValue => {
	const version = parseInt(packetString.slice(0, 3), 2)
	const typeId = parseInt(packetString.slice(3, 6), 2)
	const { literalValue, remaining } = getLiteralValue(packetString.slice(6, packetString.length))

	return {
		__type: 'LiteralValue',
		packetString,
		version,
		typeId,
		literalValue,
		remaining,
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
		literalValue: parseInt(literalValue, 2),
		remaining,
	}
}

const getPacketWithOperator = (packetString: string): PacketWithOperator => {
	const version = parseInt(packetString.slice(0, 3), 2)
	const typeId = parseInt(packetString.slice(3, 6), 2)
	const lengthTypeId = parseInt(packetString.slice(6, 7), 2)

	const labelLength = lengthTypeId === 1 ? 11 : 15
	const endOfLabelPosition = 7 + labelLength
	const label = parseInt(packetString.slice(7, endOfLabelPosition), 2)
	const subPackets: AnyPacket[] = []

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

	return {
		__type: 'Operator',
		packetString,
		version,
		typeId,
		lengthTypeId,
		label,
		subPackets,
		remaining,
	}
}

const getPacketVersionNumbers = (packet: AnyPacket): number => {
	if (packet.__type === 'LiteralValue') return packet.version
	return (
		packet.version +
		(packet.subPackets.length ? packet.subPackets.reduce((total, packet) => total + getPacketVersionNumbers(packet), 0) : 0)
	)
}

const run = async () => {
	const hexadecimalString = await readList('16.txt')
	const packetString = toBinary(hexadecimalString[0])

	const packet = getPacket(packetString)
	const versionNumbers = getPacketVersionNumbers(packet)

	console.log(JSON.stringify(packet, null, 4))

	console.log(`The answer for 16a is: ${versionNumbers}`)
}

run()
