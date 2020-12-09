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

	public constructor(public input: string[]) {}

	public run() {
		this.doAction(this.input[this.currentIndex])

		return this
	}

	private doAction(action: string) {
		const { command, value } = BootCode.getActionInfo(action)

		console.log(`Running command "${command}" with value "${value}"`)

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

		if (!this.alreadyExecutedJobs.includes(this.currentIndex)) {
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

const getAccValue = async () => {
	const list = await readList('8.txt')

	return new BootCode(list).run().value
}

run('8a', getAccValue)
