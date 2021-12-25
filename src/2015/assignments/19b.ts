import { readList, shuffle } from '@/utils'

const replaceNth = (s: string, f: string, r: string, n: number) => {
	// From the given string s, replace f with r of nth occurrence
	return s.replace(RegExp('^(?:.*?' + f + '){' + n + '}'), (x) => x.replace(RegExp(f + '$'), r))
}

const run = async () => {
	const list = await readList('19.txt', '2015')

	let medicinMolecule = list[list.length - 1]
	let replacements = list.slice(0, list.length - 2).map((replacement) => replacement.split(' => '))

	replacements = shuffle(replacements)
	let count2 = 0
	let reshuffleCount = 0
	let tmp = medicinMolecule
	while (tmp !== 'e') {
		let last = tmp
		replacements.forEach((replacement) => {
			if (tmp.includes(replacement[1])) {
				tmp = replaceNth(tmp, replacement[1], replacement[0], 1)
				count2++
			}
		})
		if (last === tmp && tmp !== 'e') {
			replacements = shuffle(replacements)
			tmp = medicinMolecule
			count2 = 0
			reshuffleCount++
		}
	}

	console.log(`The answer for 19b is: ${count2}`)
}

run()
