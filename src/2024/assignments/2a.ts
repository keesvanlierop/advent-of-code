import { readList } from '@/utils'

const isSafeReport = (report: number[]) => {
	return (isAscending(report) || isDescending(report)) && isWithinRange(report)
}

const isAscending = (report: number[]) => report.every((n, i) => !report[i + 1] || n < report[i + 1])
const isDescending = (report: number[]) => report.every((n, i) => !report[i + 1] || n > report[i + 1])
const isWithinRange = (report: number[]) => report.every((n, i) => !report[i + 1] || Math.abs(n - report[i + 1]) <= 3)

const run = async () => {
	const list = await readList('2.txt')

	const reports = list.map((item) => item.split(' ').map(Number))
	const amountOfSafeNumbers = reports.reduce((amountOfSafeReports, report) => amountOfSafeReports + (isSafeReport(report) ? 1 : 0), 0)

	console.log(`The answer for 2a is: ${amountOfSafeNumbers}`)
}

run()
