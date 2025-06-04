import moment from 'moment-timezone'

export class TimeHelper {
	private timezone: string

	constructor(timezone: string = 'UTC+1') {
		this.timezone = TimeHelper.normalizeTimezone(timezone)
	}

	static allowedTokens = [
		'YYYY',
		'YY',
		'M',
		'MM',
		'MMM',
		'MMMM',
		'D',
		'DD',
		'Do',
		'H',
		'HH',
		'h',
		'hh',
		'm',
		'mm',
		's',
		'ss',
		'a',
		'A',
		'Z',
		'ZZ',
		'ddd',
		'dddd'
	]

	static normalizeTimezone(input: string): string {
		const match = input.match(/^UTC([+-]\d{1,2})$/)
		if (match) {
			const offset = parseInt(match[1], 10)
			const etcZone = `Etc/GMT${offset > 0 ? `-${offset}` : `+${Math.abs(offset)}`}`
			return etcZone
		}
		return input
	}

	static isValidFormat(format: string): boolean {
		const tokens = format.match(/([A-Za-z]+)/g)
		if (!tokens) return true
		return tokens.every((token) => TimeHelper.allowedTokens.includes(token))
	}

	epochNow(): number {
		return moment.tz(this.timezone).unix()
	}

	epochAdd(amount: number, unit: moment.unitOfTime.DurationConstructor): number {
		if (amount <= 0) {
			throw new Error('Amount must be positive')
		}
		return moment.tz(this.timezone).add(amount, unit).unix()
	}

	toEpoch(date: Date): number {
		return moment.tz(date, this.timezone).unix()
	}

	toDate(epoch: number): Date {
		return moment.unix(epoch).tz(this.timezone).toDate()
	}

	toISOString(epoch: number): string {
		return moment.unix(epoch).tz(this.timezone).toISOString()
	}

	toLocalISOString(epoch: number): string {
		return moment.unix(epoch).tz(this.timezone).format('YYYY-MM-DDTHH:mm:ssZ')
	}

	isBefore(epoch1: number, epoch2: number): boolean {
		return moment.unix(epoch1).tz(this.timezone).isBefore(moment.unix(epoch2).tz(this.timezone))
	}

	isAfter(epoch1: number, epoch2: number): boolean {
		return moment.unix(epoch1).tz(this.timezone).isAfter(moment.unix(epoch2).tz(this.timezone))
	}

	timeAgo(epoch: number): string {
		const time = moment.unix(epoch).tz(this.timezone)
		return time.fromNow()
	}

	formatDate(epoch: number, format: string): string {
		if (!TimeHelper.isValidFormat(format)) {
			throw new Error('Invalid date format')
		}
		return moment.unix(epoch).tz(this.timezone).format(format)
	}
}
