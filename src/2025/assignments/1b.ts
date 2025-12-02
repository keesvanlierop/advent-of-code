import { readList } from '@/utils'

const run = async () => {
	const list = await readList('1.dummy.txt')

	function countZeros(rotations: string[]): number {
		let pos = 50 // starting position
		let zeros = 0 // count of times dial points at 0

		for (const line of rotations) {
			const dir = line[0] // 'L' or 'R'
			const steps = parseInt(line.slice(1)) // distance value

			// Determine signed movement:
			// R means +steps, L means -steps
			const delta = dir === 'R' ? steps : -steps

			// Normalize direction: + for R, - for L
			const direction = delta > 0 ? 1 : -1
			let distance = Math.abs(delta)

			// How many complete 100-click cycles?
			const fullCycles = Math.floor(distance / 100)
			zeros += fullCycles // each full cycle crosses 0 once

			// Handle the remaining clicks after full cycles
			const leftover = distance % 100

			// Simulate only the leftover clicks
			for (let i = 0; i < leftover; i++) {
				pos = (pos + direction + 100) % 100
				if (pos === 0) zeros++
			}
		}

		return zeros
	}

	const pointingAtZero = countZeros(list)

	console.log(`The answer for 1b is: ${pointingAtZero}`)
}

run()
