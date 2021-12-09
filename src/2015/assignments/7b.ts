import { readList } from '@/utils'

type Wire = string
type Instruction = string[]

const createInstructionExecutionOrder = (input: string[]): [Wire, Instruction][] => {
	const dependencies = new Map<Wire, Wire[]>()
	const instructions = new Map<Wire, Instruction>()

	for (const line of input) {
		const [instruction, wire] = line.split(' -> ')
		dependencies.set(wire, instruction.match(/([a-z]+)/g) || [])
		instructions.set(wire, instruction.split(' '))
	}

	const visited = new Set<Wire>()
	const ordered: Wire[] = []

	;[...dependencies.keys()].forEach(function dfs(wire: Wire) {
		if (visited.has(wire)) return
		visited.add(wire)
		dependencies.get(wire)?.forEach(dfs)
		ordered.push(wire)
	})

	// @ts-ignore
	return ordered.reduce(
		// @ts-ignore
		(wires, wire) => [...wires, [wire, instructions.get(wire)]],
		[],
	)
}

type Signals = Map<Wire, number>

const emulate = (signals: Signals, instruction: Instruction): number => {
	// @ts-ignore
	const get = (token: string): number => (signals.has(token) ? signals.get(token) : Number(token))

	switch (true) {
		case instruction.includes('AND'):
			return get(instruction[0]) & get(instruction[2])
		case instruction.includes('OR'):
			return get(instruction[0]) | get(instruction[2])
		case instruction.includes('LSHIFT'):
			return get(instruction[0]) << get(instruction[2])
		case instruction.includes('RSHIFT'):
			return get(instruction[0]) >> get(instruction[2])
		case instruction.includes('NOT'):
			return ~get(instruction[1]) & 0xffff
		default:
			return get(instruction[0])
	}
}

const run = async () => {
	const list = await readList('7.txt', '2015')

	const instructions = createInstructionExecutionOrder(list.map((i) => i.replace(/^\d+ -> b$/gm, `3176 -> b`)))
	const signals: Signals = instructions.reduce(
		(signals, [wire, instruction]) => signals.set(wire, emulate(signals, instruction)),
		new Map(),
	)

	console.log(`The answer for 7b is: ${signals.get('a')}`)
}

run()
