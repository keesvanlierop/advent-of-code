import { add, chunks, readList } from '@/utils'

const getGroups = (list: string[]) => {
	return [...chunks(list, 3)] as [string, string, string][]
}

const getBadgeForGroup = (group: [string, string, string]) => {
    return group[0].split('').find(char => group[1].includes(char) && group[2].includes(char)) || ''
}

const getPriorityForBadge = (badge: string) => {
    const charCode = badge.charCodeAt(0)
    
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

	const groups = getGroups(list)
	const badges = groups.map(getBadgeForGroup)
    const priorities = badges.map(getPriorityForBadge)
    console.log(badges, priorities)


	console.log(
		`The answer for 3b is: ${add(priorities)}`,
	)
}

run()
