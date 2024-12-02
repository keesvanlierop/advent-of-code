export const getNextSeparatorIndex = <T extends any, Separator extends T>(array: T[], separator: Separator, currentIndex: number) => {
	return array.indexOf(separator, currentIndex)
}

export const chunkBy = <T extends any, Separator extends T>(array: T[], separator: Separator) => {
	const chunkedMap: Record<string, T[]> = array.reduce((map, item, index) => {
		const nextSeparatorIndex = getNextSeparatorIndex(array, separator, index)

		const mapKey = `group:${nextSeparatorIndex}`

		return {
			...map,
			[mapKey]: [...(map[mapKey as keyof typeof map] || []), item],
		}
	}, {})

	const lastIndexKey = 'group:-1'
	const lastIndex = chunkedMap[lastIndexKey]

	const chunkedArray = Object.entries(chunkedMap)
		.filter(([key]) => key !== lastIndexKey)
		.map(([, value]) => value)

	return [...chunkedArray, lastIndex]
}

export const chunk = (arr: any[], size: number) => {
	return arr.reduce((acc, val, ind) => {
		const subIndex = ind % size
		if (!Array.isArray(acc[subIndex])) {
			acc[subIndex] = [val]
		} else {
			acc[subIndex].push(val)
		}
		return acc
	}, [])
}

export function* chunks<T extends any>(arr: T[], n: number) {
	for (let i = 0; i < arr.length; i += n) {
		yield arr.slice(i, i + n)
	}
}

export function flatten(items: any[]) {
	const flat: any[] = []

	items.forEach((item) => {
		if (Array.isArray(item)) {
			flat.push(...flatten(item))
		} else {
			flat.push(item)
		}
	})

	return flat
}

export const permute = <T extends any>(input: T[], unique = false): T[][] => {
	const permute = (res: any, item: any, key: any, arr: any) => {
		return res.concat(
			(arr.length > 1 &&
				arr
					.slice(0, key)
					.concat(arr.slice(key + 1))
					.reduce(permute, [])
					.map((perm: any) => [item].concat(perm))) ||
				item,
		)
	}

	return input.reduce((res, item, key, arr) => (key > 0 && unique ? res : permute(res, item, key, arr)), [])
}

export const isEqual = (a: any[], b: any[]) => JSON.stringify(a) === JSON.stringify(b)

export const shuffle = <T extends any>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5)

export function combine<T extends any>(a: T[], min: number) {
	var fn = (n: number, src: T[], got: T[], all: T[][]) => {
		if (n == 0) {
			if (got.length > 0) {
				all[all.length] = got
			}
			return
		}
		for (var j = 0; j < src.length; j++) {
			fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all)
		}
		return
	}
	var all: T[][] = []
	for (var i = min; i < a.length; i++) {
		fn(i, a, [], all)
	}
	all.push(a)
	return all
}

export function removeElementAtIndex<T extends any>(arr: T[], i: number) {
	if (i < 0 || i >= arr.length) {
		throw new Error('Index out of bounds')
	}
	return [...arr.slice(0, i), ...arr.slice(i + 1)]
}
