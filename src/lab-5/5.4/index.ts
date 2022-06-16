const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60
const SECONDS_IN_DAY = 86400

class Time {
    private seconds: number
    private valid: boolean = true

    constructor(hours: number, minutes: number, seconds?: number);
    constructor(timestamp: number);
    constructor(hours: number, minutes?: number, seconds = 0) {
        if (minutes !== undefined) {
            this.valid = Time.isValidParameters(hours, minutes, seconds)
            this.seconds = Time.convertToTimestamp(hours, minutes, seconds)
        } else {
            this.seconds = hours
        }
    }

    public static convertTimestampToTime(timestamp: number): Time {
        return new Time(
            Time.hoursInTimestamp(timestamp),
            Time.minutesInTimestamp(timestamp),
            Time.secondsInTimestamp(timestamp)
        )
    }

    public static add(time1: Time, time2: Time): Time {
        const temporaryTimestamp: number = Time.getCorrectSeconds(time1.seconds + time2.seconds)
        return Time.convertTimestampToTime(temporaryTimestamp)
    }

    public static sub(subtrahend: Time, residual: Time): Time {
        const temporaryTimestamp: number = Time.getCorrectSeconds(subtrahend.seconds - residual.seconds)
        return Time.convertTimestampToTime(temporaryTimestamp)
    }

    public static multi(time: Time, coefficient: number): Time {
        if (!Number.isInteger(coefficient)) {
            // throw new Error(ERROR_MESSAGE_NOT_INTEGER)
        }

        const temporaryTimestamp: number = Time.getCorrectSeconds(time.seconds * coefficient)
        return Time.convertTimestampToTime(temporaryTimestamp)
    }

    public static div(dividend: Time, divisor: Time | number): Time {
        //можно вынести одинаковый код
        let temporaryTimestamp: number
        if (typeof divisor === 'number') {
            if (divisor === 0) {
                // throw new Error(ERROR_MESSAGE_NULL)
            }

            if (!Number.isInteger(divisor)) {
                // throw new Error(ERROR_MESSAGE_NOT_INTEGER)
            }

            temporaryTimestamp = dividend.seconds / divisor
        } else {
            if (divisor.seconds === 0) {
                // throw new Error(ERROR_MESSAGE_NULL)
            }
            temporaryTimestamp = dividend.seconds / divisor.seconds
        }
        temporaryTimestamp = Math.trunc(Time.getCorrectSeconds(temporaryTimestamp))
        return Time.convertTimestampToTime(temporaryTimestamp)
    }

    public static equal(time1: Time, time2: Time): boolean {
        return time1.seconds === time2.seconds
    }

    public static notEqual(time1: Time, time2: Time): boolean {
        return time1.seconds !== time2.seconds
    }

    public static isLarger(time1: Time, time2: Time): boolean {
        return time1.seconds > time2.seconds
    }

    public static isNotLarger(time1: Time, time2: Time): boolean {
        return time1.seconds <= time2.seconds
    }

    public static isLess(time1: Time, time2: Time): boolean {
        return time1.seconds < time2.seconds
    }

    public static isNotLess(time1: Time, time2: Time): boolean {
        return time1.seconds >= time2.seconds
    }

    private static convertToTimestamp(hours: number, minutes: number, seconds: number) {
        return hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds

    }

    private static hoursInTimestamp(timestamp: number): number {
        return Math.trunc(timestamp / SECONDS_IN_HOUR)
    }

    private static minutesInTimestamp(timestamp: number): number {
        const hours: number = Time.hoursInTimestamp(timestamp)
        return Math.trunc((timestamp - hours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
    }

    private static secondsInTimestamp(timestamp: number): number {
        const hours: number = Time.hoursInTimestamp(timestamp)
        const minutes: number = Time.minutesInTimestamp(timestamp)
        return timestamp - hours * SECONDS_IN_HOUR - minutes * SECONDS_IN_MINUTE
    }

    private static isValidParameters(hours: number, minutes: number, seconds: number): boolean {
        return Time.isValidHoursParameter(hours) && Time.isValidMinutesParameter(minutes) && Time.isValidSecondsParameter(seconds)
    }

    private static isValidHoursParameter(hours: number): boolean {
        return Number.isInteger(hours) && hours >= 0 && hours < 24

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
        return Time.hoursInTimestamp(this.seconds)
    }

    public getMinutes(): number {
        return Time.minutesInTimestamp(this.seconds)
    }

    public getSeconds(): number {
        return Time.secondsInTimestamp(this.seconds)
    }

    public isValid(): boolean {
        return this.valid
    }

    public postIncrement(): Time {
        const temporaryTime: Time = new Time(
            Time.hoursInTimestamp(this.seconds),
            Time.minutesInTimestamp(this.seconds),
            Time.secondsInTimestamp(this.seconds)
        )
        this.seconds = Time.getCorrectSeconds(++this.seconds)
        return temporaryTime
    }

    public prefixIncrement(): Time {
        this.seconds = Time.getCorrectSeconds(++this.seconds)
        return this
    }

    public postDecrement(): Time {
        const temporaryTime: Time = new Time(
            Time.hoursInTimestamp(this.seconds),
            Time.minutesInTimestamp(this.seconds),
            Time.secondsInTimestamp(this.seconds)
        )
        this.seconds = Time.getCorrectSeconds(--this.seconds)
        return temporaryTime
    }

    public prefixDecrement(): Time {
        this.seconds = Time.getCorrectSeconds(--this.seconds)
        return this
    }

    public addWithAssignment(time: Time): Time {
        // const temporarySeconds = this.seconds + time.seconds
        const next = Time.add(this, time)

        this.seconds = Time.getCorrectSeconds(next.seconds)
        return this
    }

    public subWithAssignment(time: Time): Time {
        const temporarySeconds = Time.sub(this, time)
        this.seconds = Time.getCorrectSeconds(temporarySeconds.seconds)
        return this
    }

    // исп Time.multi(this, coef)
    public multiWithAssignment(coefficient: number): Time {
        if (!Number.isInteger(coefficient)) {
            // throw new Error(ERROR_MESSAGE_NOT_INTEGER)
        }

        let temporarySeconds: number
        temporarySeconds = this.seconds * coefficient

        this.seconds = Time.getCorrectSeconds(temporarySeconds)
        return this
    }

    // исп Time.div(this, div)
    public divWithAssignment(divisor: Time | number): Time {
        let temporarySeconds: number
        if (typeof divisor === 'number') {
            if (divisor === 0) {
                // throw new Error(ERROR_MESSAGE_NULL)
            }

            if (!Number.isInteger(divisor)) {
                // throw new Error(ERROR_MESSAGE_NOT_INTEGER)
            }
            temporarySeconds = this.seconds / divisor
        } else {
            if (divisor.seconds === 0) {
                // throw new Error(ERROR_MESSAGE_NULL)
            }
            temporarySeconds = this.seconds / divisor.seconds
        }
        this.seconds = Math.trunc(Time.getCorrectSeconds(temporarySeconds))
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

    public init(value: string): Time {
        const [h, m, s] = value.split(':')
        this.seconds = new Time(this.stringToNumber(h), this.stringToNumber(m), this.stringToNumber(s)).seconds
        return this
    }
}

const time = new Time(23, 59, 59)
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
console.log(time.print())