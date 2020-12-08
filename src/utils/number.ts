export const multiply = (numbers: number[]) => {
	return numbers.reduce((acc, number) => acc * number, 1)
}
export const add = (numbers: number[]) => {
	return numbers.reduce((acc, number) => acc + number, 0)
}
