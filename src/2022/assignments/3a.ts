import { add, readList } from '@/utils'

const getRucksacks = (list: string[]) => {
	return list.map(row => {
        const itemLength = row.length
        const compartmentLength = itemLength / 2
        return row.match(new RegExp(`.{1,${compartmentLength}}`, 'g')) as [string, string]
    })
}

const getCommonItemForRuckSack = (compartments: [string, string]) => {
    return compartments[0].split('').find(char => compartments[1].includes(char))  || ''
}

const getPriorityForCommonItemType = (commonItemType: string) => {
    const charCode = commonItemType.charCodeAt(0)
    
    // uppercase A-Z
    if (charCode <= 90) {
        return charCode - 64 + 26
    // lowercase a-z
    } else {
        return charCode - 96
    }
}

const run = async () => {
	const list = await readList('3.txt')

	const rucksacks = getRucksacks(list)
	const commonItemTypes = rucksacks.map(getCommonItemForRuckSack)
    console.log(commonItemTypes)
    const priorities = commonItemTypes.map(getPriorityForCommonItemType)
    console.log(priorities)

	console.log(
		`The answer for 3a is: ${add(priorities)}`,
	)
}

run()
