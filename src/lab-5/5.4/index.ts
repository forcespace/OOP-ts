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

export class Index {
    private seconds: number
    private valid: boolean = true

    // constructor(hours: number, minutes: number, seconds?: number);
    // constructor(timestamp: number);
    constructor(hours: number, minutes: number, seconds = 0) {
        if (minutes !== undefined) {
            this.valid = Index.isValidParameters(hours, minutes, seconds)
            this.seconds = Index.convertToTimestamp(hours, minutes, seconds)
        } else {
            this.seconds = hours
        }
    }

    public static convertTimestampToTime(timestamp: number): Index {
        return new Index(
            Index.hoursInTimestamp(timestamp),
            Index.minutesInTimestamp(timestamp),
            Index.secondsInTimestamp(timestamp)
        )
    }

    public static add(time1: Index, time2: Index): Index {
        const temporaryTimestamp: number = Index.getCorrectSeconds(time1.seconds + time2.seconds)
        return Index.convertTimestampToTime(temporaryTimestamp)
    }

    public static sub(subtrahend: Index, residual: Index): Index {
        const temporaryTimestamp: number = Index.getCorrectSeconds(subtrahend.seconds - residual.seconds)
        return Index.convertTimestampToTime(temporaryTimestamp)
    }

    public static multi(time: Index, coefficient: number): Index {
        if (!Number.isInteger(coefficient)) {
            console.log(MESSAGES.ERROR.NOT_INT)
        }

        const temporaryTimestamp: number = Index.getCorrectSeconds(time.seconds * coefficient)
        return Index.convertTimestampToTime(temporaryTimestamp)
    }

    public static div(dividend: Index, divisor: Index | number): Index {
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
        temporaryTimestamp = Math.trunc(Index.getCorrectSeconds(temporaryTimestamp))
        return Index.convertTimestampToTime(temporaryTimestamp)
    }

    public static equal(time1: Index, time2: Index): boolean {
        return time1.seconds === time2.seconds
    }

    public static notEqual(time1: Index, time2: Index): boolean {
        return time1.seconds !== time2.seconds
    }

    public static isLarger(time1: Index, time2: Index): boolean {
        return time1.seconds > time2.seconds
    }

    public static isNotLarger(time1: Index, time2: Index): boolean {
        return time1.seconds <= time2.seconds
    }

    public static isLess(time1: Index, time2: Index): boolean {
        return time1.seconds < time2.seconds
    }

    public static isNotLess(time1: Index, time2: Index): boolean {
        return time1.seconds >= time2.seconds
    }

    private static convertToTimestamp(hours: number, minutes: number, seconds: number) {
        return hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds
    }

    private static hoursInTimestamp(timestamp: number): number {
        return Math.trunc(timestamp / SECONDS_IN_HOUR)
    }

    private static minutesInTimestamp(timestamp: number): number {
        const hours: number = Index.hoursInTimestamp(timestamp)
        return Math.trunc((timestamp - hours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
    }

    private static secondsInTimestamp(timestamp: number): number {
        const hours: number = Index.hoursInTimestamp(timestamp)
        const minutes: number = Index.minutesInTimestamp(timestamp)
        return timestamp - hours * SECONDS_IN_HOUR - minutes * SECONDS_IN_MINUTE
    }

    private static isValidParameters(hours: number, minutes: number, seconds: number): boolean {
        return Index.isValidHoursParameter(hours) && Index.isValidMinutesParameter(minutes) && Index.isValidSecondsParameter(seconds)
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
        return Index.hoursInTimestamp(this.seconds)
    }

    public getMinutes(): number {
        return Index.minutesInTimestamp(this.seconds)
    }

    public getSeconds(): number {
        return Index.secondsInTimestamp(this.seconds)
    }

    public isValid(): boolean {
        return this.valid
    }

    public postIncrement(): Index {
        const temporaryTime: Index = new Index(
            Index.hoursInTimestamp(this.seconds),
            Index.minutesInTimestamp(this.seconds),
            Index.secondsInTimestamp(this.seconds)
        )
        this.seconds = Index.getCorrectSeconds(++this.seconds)
        return temporaryTime
    }

    public prefixIncrement(): Index {
        this.seconds = Index.getCorrectSeconds(++this.seconds)
        return this
    }

    public postDecrement(): Index {
        const temporaryTime: Index = new Index(
            Index.hoursInTimestamp(this.seconds),
            Index.minutesInTimestamp(this.seconds),
            Index.secondsInTimestamp(this.seconds)
        )
        this.seconds = Index.getCorrectSeconds(--this.seconds)
        return temporaryTime
    }

    public prefixDecrement(): Index {
        this.seconds = Index.getCorrectSeconds(--this.seconds)
        return this
    }

    public addWithAssignment(time: Index): Index {
        const next = Index.add(this, time)

        this.seconds = Index.getCorrectSeconds(next.seconds)
        return this
    }

    public subWithAssignment(time: Index): Index {
        const temporarySeconds = Index.sub(this, time)
        this.seconds = Index.getCorrectSeconds(temporarySeconds.seconds)
        return this
    }

    public multiWithAssignment(coefficient: number): Index {
        if (!Number.isInteger(coefficient)) {
            console.log(MESSAGES.ERROR.NOT_INT)
        }

        let temporarySeconds: number
        temporarySeconds = this.seconds * coefficient

        this.seconds = Index.getCorrectSeconds(temporarySeconds)
        return this
    }

    public divWithAssignment(divisor: Index | number): Index {
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
        this.seconds = Math.trunc(Index.getCorrectSeconds(temporarySeconds))
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

    public init(value: string): Index {
        const [h, m, s] = value.split(':')
        this.seconds = new Index(this.stringToNumber(h), this.stringToNumber(m), this.stringToNumber(s)).seconds
        return this
    }
}

const time = new Index(23, 59, 59)
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