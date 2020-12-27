export const run = async <T extends any>(assignment: string, func: () => T) => {
	console.time(assignment)
	const result = await func()
	console.timeEnd(assignment)
	console.log(`The answer for ${assignment} is: ${result}`)
}
