export const run = async <T extends any>(assignment: string, func: () => T) => {
	const result = await func()
	console.log(`The answer for ${assignment} is: ${result}`)
}
