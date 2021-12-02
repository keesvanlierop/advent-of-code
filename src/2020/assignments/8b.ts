import { readList, run } from '@/utils'

export enum CommandType {
	NO_OPERATION = 'nop',
	ACCUMULATE = 'acc',
	JUMP = 'jmp',
}

export class BootCode {
	public value = 0
	public currentIndex = 0
	public alreadyExecutedJobs: number[] = []

	public constructor(
		public input: string[],
		public throwErrorOnInfiniteLoop = true,
	) {}

	public run() {
		this.doAction(this.input[this.currentIndex])

		return this
	}

	private doAction(action: string) {
		const { command, value } = BootCode.getActionInfo(action)

		this.alreadyExecutedJobs.push(this.currentIndex)

		switch (command) {
			case CommandType.NO_OPERATION:
			default:
				this.currentIndex += 1
				break
			case CommandType.ACCUMULATE:
				this.value += value
				this.currentIndex += 1
				break
			case CommandType.JUMP:
				this.currentIndex += value
				break
		}

		if (
			this.alreadyExecutedJobs.includes(this.currentIndex) &&
			this.throwErrorOnInfiniteLoop
		) {
			throw new Error(
				`I am stuck in an infinite loop. Current value is ${this.value}.`,
			)
		}

		if (this.input[this.currentIndex]) {
			this.run()
		}

		return this
	}

	public static getActionInfo(action: string) {
		const [command, value] = action.split(' ')

		return {
			command: command as CommandType,
			value: Number(value),
		}
	}
}

const getProgramVariations = (list: string[]) => {
	return list
		.map((action, index) => ({
			action: BootCode.getActionInfo(action),
			index,
		}))
		.filter((data) => data.action.command !== CommandType.ACCUMULATE)
		.map((data) => ({
			...data,
			nextCommand:
				data.action.command === CommandType.NO_OPERATION
					? CommandType.JUMP
					: CommandType.NO_OPERATION,
		}))
		.map((data) => {
			const clonedList = [...list]
			const formattedValue = `${data.action.value >= 0 ? '+' : ''}${
				data.action.value
			}`
			clonedList[data.index] = `${data.nextCommand} ${formattedValue}`
			return clonedList
		})
}

const getAccValue = async () => {
	const list = await readList('8.txt')

	const programVariations = getProgramVariations(list)

	console.log(programVariations)

	const results = programVariations.map((program) => {
		try {
			return new BootCode(program).run().value
		} catch (error) {
			return null
		}
	})

	console.log(results)

	return results.find(Boolean)
}

run('8b', getAccValue)
