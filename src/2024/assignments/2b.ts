import { readList, removeElementAtIndex } from '@/utils'

const isSafeReport = (report: number[], withProblemDampener = true): boolean => {
	const isSafe = (isAscending(report) || isDescending(report)) && isWithinRange(report)
	if (isSafe) {
		return true
	}

	if (!withProblemDampener) {
		return false
	}

	let i = 0
	let isSafeWithProblemDampener = false
	while (report[i] && !isSafeWithProblemDampener) {
		const reportWithoutElement = removeElementAtIndex(report, i)
		isSafeWithProblemDampener = isSafeReport(reportWithoutElement, false)
		i++
	}

	return isSafeWithProblemDampener
}

const isAscending = (report: number[]) => report.every((n, i) => !report[i + 1] || n < report[i + 1])
const isDescending = (report: number[]) => report.every((n, i) => !report[i + 1] || n > report[i + 1])
const isWithinRange = (report: number[]) => report.every((n, i) => !report[i + 1] || Math.abs(n - report[i + 1]) <= 3)

const run = async () => {
	const list = await readList('2.txt')

	const reports = list.map((item) => item.split(' ').map(Number))
	const amountOfSafeNumbers = reports.reduce((amountOfSafeReports, report) => amountOfSafeReports + (isSafeReport(report) ? 1 : 0), 0)

	console.log(`The answer for 2b is: ${amountOfSafeNumbers}`)
}

run()
