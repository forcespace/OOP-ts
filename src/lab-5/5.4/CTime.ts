const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60
const SECONDS_IN_DAY = 86400
const HOURS_IN_DAY = 24

const MESSAGES = {
    ERROR: {
        NOT_INT: 'Input must be integer',
        BAD_VALUE: 'Must be > 0'
    }
}

export class CTime {
    private seconds: number
    private valid: boolean = true

    // constructor(hours: number, minutes: number, seconds?: number);
    // constructor(timestamp: number);
    constructor(hours: number, minutes: number, seconds = 0) {
        if (minutes !== undefined) {
            this.valid = CTime.isValidParameters(hours, minutes, seconds)
            this.seconds = CTime.convertToTimestamp(hours, minutes, seconds)
        } else {
            this.seconds = hours
        }
    }

    public static convertTimestampToTime(timestamp: number): CTime {
        return new CTime(
            CTime.hoursInTimestamp(timestamp),
            CTime.minutesInTimestamp(timestamp),
            CTime.secondsInTimestamp(timestamp)
        )
    }

    public static add(time1: CTime, time2: CTime): CTime {
        const temporaryTimestamp: number = CTime.getCorrectSeconds(time1.seconds + time2.seconds)
        return CTime.convertTimestampToTime(temporaryTimestamp)
    }

    public static sub(subtrahend: CTime, residual: CTime): CTime {
        const temporaryTimestamp: number = CTime.getCorrectSeconds(subtrahend.seconds - residual.seconds)
        return CTime.convertTimestampToTime(temporaryTimestamp)
    }

    public static multi(time: CTime, coefficient: number): CTime {
        if (!Number.isInteger(coefficient)) {
            console.log(MESSAGES.ERROR.NOT_INT)
        }

        const temporaryTimestamp: number = CTime.getCorrectSeconds(time.seconds * coefficient)
        return CTime.convertTimestampToTime(temporaryTimestamp)
    }

    public static div(dividend: CTime, divisor: CTime | number): CTime {
        let temporaryTimestamp: number
        if (typeof divisor === 'number') {
            if (divisor === 0) {
                console.log(MESSAGES.ERROR.BAD_VALUE)
            }

            if (!Number.isInteger(divisor)) {
                console.log(MESSAGES.ERROR.NOT_INT)
            }

            temporaryTimestamp = dividend.seconds / divisor
        } else {
            if (divisor.seconds === 0) {
                console.log(MESSAGES.ERROR.BAD_VALUE)
            }
            temporaryTimestamp = dividend.seconds / divisor.seconds
        }
        temporaryTimestamp = Math.trunc(CTime.getCorrectSeconds(temporaryTimestamp))
        return CTime.convertTimestampToTime(temporaryTimestamp)
    }

    public static equal(time1: CTime, time2: CTime): boolean {
        return time1.seconds === time2.seconds
    }

    public static notEqual(time1: CTime, time2: CTime): boolean {
        return time1.seconds !== time2.seconds
    }

    public static isLarger(time1: CTime, time2: CTime): boolean {
        return time1.seconds > time2.seconds
    }

    public static isNotLarger(time1: CTime, time2: CTime): boolean {
        return time1.seconds <= time2.seconds
    }

    public static isLess(time1: CTime, time2: CTime): boolean {
        return time1.seconds < time2.seconds
    }

    public static isNotLess(time1: CTime, time2: CTime): boolean {
        return time1.seconds >= time2.seconds
    }

    private static convertToTimestamp(hours: number, minutes: number, seconds: number) {
        return hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds
    }

    private static hoursInTimestamp(timestamp: number): number {
        return Math.trunc(timestamp / SECONDS_IN_HOUR)
    }

    private static minutesInTimestamp(timestamp: number): number {
        const hours: number = CTime.hoursInTimestamp(timestamp)
        return Math.trunc((timestamp - hours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
    }

    private static secondsInTimestamp(timestamp: number): number {
        const hours: number = CTime.hoursInTimestamp(timestamp)
        const minutes: number = CTime.minutesInTimestamp(timestamp)
        return timestamp - hours * SECONDS_IN_HOUR - minutes * SECONDS_IN_MINUTE
    }

    private static isValidParameters(hours: number, minutes: number, seconds: number): boolean {
        return CTime.isValidHoursParameter(hours) && CTime.isValidMinutesParameter(minutes) && CTime.isValidSecondsParameter(seconds)
    }

    private static isValidHoursParameter(hours: number): boolean {
        return Number.isInteger(hours) && hours >= 0 && hours < HOURS_IN_DAY
    }

    private static isValidMinutesParameter(minutes: number): boolean {
        return Number.isInteger(minutes) && minutes >= 0 && minutes < 60
    }

    private static isValidSecondsParameter(seconds: number): boolean {
        return Number.isInteger(seconds) && seconds >= 0 && seconds < 60
    }

    private static getCorrectSeconds(timestamp: number): number {
        const result = timestamp % SECONDS_IN_DAY

        if (result === SECONDS_IN_DAY) {
            return 0
        }

        if (result < 0) {
            return SECONDS_IN_DAY + result
        }

        return result
    }

    public getHours(): number {
        return CTime.hoursInTimestamp(this.seconds)
    }

    public getMinutes(): number {
        return CTime.minutesInTimestamp(this.seconds)
    }

    public getSeconds(): number {
        return CTime.secondsInTimestamp(this.seconds)
    }

    public isValid(): boolean {
        return this.valid
    }

    public postIncrement(): CTime {
        const temporaryTime: CTime = new CTime(
            CTime.hoursInTimestamp(this.seconds),
            CTime.minutesInTimestamp(this.seconds),
            CTime.secondsInTimestamp(this.seconds)
        )
        this.seconds = CTime.getCorrectSeconds(++this.seconds)
        return temporaryTime
    }

    public prefixIncrement(): CTime {
        this.seconds = CTime.getCorrectSeconds(++this.seconds)
        return this
    }

    public postDecrement(): CTime {
        const temporaryTime: CTime = new CTime(
            CTime.hoursInTimestamp(this.seconds),
            CTime.minutesInTimestamp(this.seconds),
            CTime.secondsInTimestamp(this.seconds)
        )
        this.seconds = CTime.getCorrectSeconds(--this.seconds)
        return temporaryTime
    }

    public prefixDecrement(): CTime {
        this.seconds = CTime.getCorrectSeconds(--this.seconds)
        return this
    }

    public addWithAssignment(time: CTime): CTime {
        const next = CTime.add(this, time)

        this.seconds = CTime.getCorrectSeconds(next.seconds)
        return this
    }

    public subWithAssignment(time: CTime): CTime {
        const temporarySeconds = CTime.sub(this, time)
        this.seconds = CTime.getCorrectSeconds(temporarySeconds.seconds)
        return this
    }

    public multiWithAssignment(coefficient: number): CTime {
        if (!Number.isInteger(coefficient)) {
            console.log(MESSAGES.ERROR.NOT_INT)
        }

        let temporarySeconds: number
        temporarySeconds = this.seconds * coefficient

        this.seconds = CTime.getCorrectSeconds(temporarySeconds)
        return this
    }

    public divWithAssignment(divisor: CTime | number): CTime {
        let temporarySeconds: number
        if (typeof divisor === 'number') {
            if (divisor === 0) {
                console.log(MESSAGES.ERROR.BAD_VALUE)
            }

            if (!Number.isInteger(divisor)) {
                console.log(MESSAGES.ERROR.NOT_INT)
            }
            temporarySeconds = this.seconds / divisor
        } else {
            if (divisor.seconds === 0) {
                console.log(MESSAGES.ERROR.NOT_INT)
            }
            temporarySeconds = this.seconds / divisor.seconds
        }
        this.seconds = Math.trunc(CTime.getCorrectSeconds(temporarySeconds))
        return this
    }

    public formatTime(value: number): string {
        return `${value}`.padStart(2, '0')
    }

    public print(): string {
        if (this.valid) {

            const hours = this.getHours()
            const minutes = this.getMinutes()
            const seconds = this.getSeconds()

            return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`
        }
        return 'invalid'
    }

    public stringToNumber(line: string): number {
        return parseInt(line)
    }

    public init(value: string): CTime {
        const [h, m, s] = value.split(':')
        this.seconds = new CTime(this.stringToNumber(h), this.stringToNumber(m), this.stringToNumber(s)).seconds
        return this
    }
}

const time = new CTime(23, 59, 59)
console.log(time.getHours())
console.log(time.getMinutes())
console.log(time.getSeconds())
console.log(time.isValid())
console.log(time.print())
console.log(time.postIncrement())
console.log(time.getHours())
console.log(time.getMinutes())
console.log(time.getSeconds())
console.log(time.isValid())
console.log(time.print())
console.log(time.init('12:00:01'))
console.log(time.getHours())
console.log(time.getMinutes())
console.log(time.getSeconds())
console.log(time.isValid())
console.log('префиксДекремент ', time.prefixDecrement())
console.log(time.print())
console.log('префиксИнкремент', time.prefixIncrement())
console.log(time.print())
console.log(time.init('12:00:00'))
console.log(time.divWithAssignment(12))
console.log(time.print())