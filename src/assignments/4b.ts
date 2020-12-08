import { chunkBy, readList, regex, run } from '@/utils'

enum DistanceUnitType {
	METRIC = 'METRIC',
	IMPERIAL = 'IMPERIAL',
	UNKNOWN = 'UNKNOWN',
}

export interface Height {
	unitType: DistanceUnitType
	value: number
}

export enum EyeColor {
	AMB = 'amb',
	BLU = 'blu',
	BRN = 'brn',
	GRY = 'gry',
	GRN = 'grn',
	HZL = 'hzl',
	OTH = 'oth',
}

export interface PassportInformation {
	// Birth year
	byr: number
	// Issue year
	iyr: number
	// Expiration year
	eyr: number
	// Height
	hgt: Height
	// Hair color
	hcl: string
	// Eye color
	ecl: EyeColor
	// Passport ID
	pid: string
	// Country ID
	cid?: string
}

export interface PropertyConfig<T extends keyof PassportInformation> {
	parse?: (rawValue: string) => PassportInformation[T]
	validate: (value: PassportInformation[T]) => boolean
}

export type PassportPropertyConfig = {
	[T in keyof PassportInformation]: PropertyConfig<T>
}

class Passport {
	public constructor(
		public information: PassportInformation,
		public rawData: string,
	) {}

	private _isValid() {
		return Object.keys(Passport.propertyConfig).every((property) => {
			const key = property as keyof PassportPropertyConfig
			const value = this.information[
				property as keyof PassportInformation
			]

			const propertyIsValid = Passport.propertyConfig[key]?.validate
				? // @ts-ignore
				  value && Passport.propertyConfig[key].validate(value)
				: true

			if (!propertyIsValid) {
				console.log(
					`Property "${key}" with value "${value}" and data type "${typeof value}" is not valid`,
					this.information,
					this.rawData,
				)
			}

			return propertyIsValid
		})
	}

	public get isValid() {
		return this._isValid()
	}

	public static propertyConfig: PassportPropertyConfig = {
		byr: {
			parse: (value) => Number(value),
			validate: (value) => value >= 1920 && value <= 2002,
		},
		iyr: {
			parse: (value) => Number(value),
			validate: (value) => value >= 2010 && value <= 2020,
		},
		eyr: {
			parse: (value) => Number(value),
			validate: (value) => value >= 2020 && value <= 2030,
		},
		hgt: {
			parse: (value) => {
				const number = value.match(/\d+/)?.[0]
				const isMetric = value.includes('cm')
				const isImperial = value.includes('in')
				const unitType = isMetric
					? DistanceUnitType.METRIC
					: isImperial
					? DistanceUnitType.IMPERIAL
					: DistanceUnitType.UNKNOWN

				return {
					unitType,
					value: Number(number),
				}
			},
			validate: ({ unitType, value }) => {
				if (unitType === DistanceUnitType.METRIC) {
					return value >= 150 && value <= 193
				}

				if (unitType === DistanceUnitType.IMPERIAL) {
					return value >= 59 && value <= 76
				}

				return false
			},
		},
		hcl: {
			validate: (value) => regex.hexColor.test(value),
		},
		ecl: {
			validate: (value) => Object.values(EyeColor).includes(value),
		},
		pid: {
			validate: (value) => regex.nineDigitNumber.test(value),
		},
	}

	public static getPassportInformationFromPassportChunks(
		passportChunks: string[],
	) {
		const rawData = passportChunks.join(' ')
		const data = rawData.split(' ')

		const information = data.reduce((information, row) => {
			const [field, value] = row.split(':')

			if (!field) return information

			const parsedValue =
				Passport.propertyConfig[
					field as keyof PassportInformation
				]?.parse?.(value) || value

			return {
				...information,
				[field]: parsedValue,
			}
		}, {} as PassportInformation)

		return {
			rawData,
			information,
		}
	}
}

const getPassports = (list: string[]) => {
	return chunkBy(list, '')
		.map(Passport.getPassportInformationFromPassportChunks)
		.map(({ rawData, information }) => new Passport(information, rawData))
}

const getAmountOfValidPassports = async () => {
	const list = await readList('4.txt')

	const passports = getPassports(list)

	return passports.filter((passport) => passport.isValid).length
}

run('4b', getAmountOfValidPassports)
