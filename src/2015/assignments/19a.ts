import { readList, regex } from '@/utils'

const replaceNth = (s: string, f: string, r: string, n: number) => {
	// From the given string s, replace f with r of nth occurrence
	return s.replace(RegExp('^(?:.*?' + f + '){' + n + '}'), (x) => x.replace(RegExp(f + '$'), r))
}

const getMedicineState = (list: string[]) => {
	const medicinModule = list[0]
	const replacements = list.slice(2, list.length).map((replacement) => {
		const [lookup, value] = replacement.split(' => ')

		return {
			value,
			lookup,
		}
	})

	const possibleReplacements = replacements.reduce<{ replacement: typeof replacements[0]; medicinModule: string }[]>(
		(map, replacement) => {
			const amountOfOccurences = medicinModule.split(replacement.lookup).length - 1

			for (let i = 1; i <= amountOfOccurences; i++) {
				map.push({
					replacement,
					medicinModule: replaceNth(medicinModule, replacement.lookup, replacement.value, i),
				})
			}

			return map
		},
		[],
	)

	return possibleReplacements
}

const run = async () => {
	const list = await readList('19.txt', '2015')

	const medicine = getMedicineState(list)
	const distinctReplacements = medicine.map((r) => r.medicinModule).filter((m, i, s) => i === s.findIndex((n) => m === n))

	console.log(`The answer for 19a is: ${distinctReplacements.length}`)
}

run()
