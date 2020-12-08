import { chunkBy, readList, run } from '@/utils'

export interface PassportInformation {
	// Birth year
	byr: number
	// Issue year
	iyr: number
	// Expiration year
	eyr: number
	// Height
	hgt: number
	// Hair color
	hcl: string
	// Eye color
	ecl: string
	// Passport ID
	pid: string
	// Country ID
	cid?: string
}

class Passport {
	public constructor(public information: PassportInformation) {}

	private _isValid() {
		return Passport.requiredFields.every(
			(requiredField) => this.information[requiredField],
		)
	}

	public get isValid() {
		return this._isValid()
	}

	public static requiredFields = [
		'byr',
		'iyr',
		'eyr',
		'hgt',
		'hcl',
		'ecl',
		'pid',
	] as const

	public static getPassportInformationFromPassportChunks(
		passportChunks: string[],
	): PassportInformation {
		const data = passportChunks.join(' ').split(' ')

		return data.reduce((information, row) => {
			const [field, value] = row.split(':')

			if (!field) return information

			return {
				...information,
				[field]: value,
			}
		}, {} as PassportInformation)
	}
}

const getPassports = (list: string[]) => {
	return chunkBy(list, '')
		.map(Passport.getPassportInformationFromPassportChunks)
		.map((information) => new Passport(information))
}

const getAmountOfValidPassports = async () => {
	const list = await readList('4.txt')

	const passports = getPassports(list)

	return passports.filter((passport) => passport.isValid).length
}

run('4a', getAmountOfValidPassports)
