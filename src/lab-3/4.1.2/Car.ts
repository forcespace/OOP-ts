enum Direction {
    Back = -1,
    Stop,
    Forward
}

enum Gear {
    Rear = -1,
    Neutral,
    First,
    Second,
    Third,
    Fourth,
    Fifth
}

const GEAR_LIMITS = {
    [Gear.Rear]: {
        min: 0,
        max: 20
    },
    [Gear.Neutral]: {
        min: 0,
        max: Infinity
    },
    [Gear.First]: {
        min: 0,
        max: 30
    },
    [Gear.Second]: {
        min: 20,
        max: 50
    },
    [Gear.Third]: {
        min: 30,
        max: 60
    },
    [Gear.Fourth]: {
        min: 40,
        max: 90
    },
    [Gear.Fifth]: {
        min: 50,
        max: 150
    }
}

export class Car {
    private engineTurnedOn: boolean
    private direction: Direction
    private speed: number
    private gear: Gear

    constructor() {
        this.engineTurnedOn = false
        this.direction = Direction.Stop
        this.speed = 0
        this.gear = Gear.Neutral
    }

    public IsTurnedOn() {
        return this.engineTurnedOn
    }

    public GetDirection(): Direction {
        return this.direction
    }

    public GetSpeed(): number {
        return this.speed
    }

    public GetGear(): Gear {
        return this.gear
    }

    public TurnOnEngine(): boolean {
        if (this.IsTurnedOn()) {
            return true
        }

        this.engineTurnedOn = true
        return true
    }

    public TurnOffEngine(): boolean {
        if (!this.IsTurnedOn()) {
            return true
        } else if (this.GetGear() === 0 && this.GetSpeed() === 0) {
            this.engineTurnedOn = false
            return true
        }
        return false
    }

    public SetGear(targetGear: Gear): boolean {
        if (targetGear in Gear) {

            if (targetGear === Gear.Rear) {
                if (this.GetSpeed() === 0) {
                    this.gear = Gear.Rear
                    // this.direction = Direction.Back

                    return true
                }

                return false
            } else if (targetGear === Gear.Neutral) {

            } else if (targetGear === Gear.First && (this.direction === Direction.Back || this.direction === Direction.Stop)) {
                if (this.GetSpeed() === 0) {
                    this.gear = Gear.First
                    // this.direction = Direction.Forward

                    return true
                }

                return false
            }

            const speed = this.GetSpeed()
            const speedLimit = GEAR_LIMITS[targetGear]
            if (speedLimit.min <= speed && speedLimit.max > speed) {
                this.gear = targetGear
                return true
            }

            return false
        }

        return false
    }

    public SetSpeed(targetSpeed: number): boolean {
        const currentGear = this.GetGear()
        if (!this.IsTurnedOn()) {
            return false
        } else if (targetSpeed < 0) {
            return false
        }
        if (targetSpeed > this.GetSpeed() && currentGear === Gear.Neutral) {
            return false
        }

        const speedLimit = GEAR_LIMITS[currentGear]
        if (speedLimit.min <= targetSpeed && speedLimit.max >= targetSpeed) {
            this.speed = targetSpeed

            if (targetSpeed === 0) {
                this.direction = Direction.Stop
            } else if (this.gear === Gear.Rear && this.GetDirection() !== Direction.Back) {
                this.direction = Direction.Back
            } else if (this.gear !== Gear.Rear && this.gear !== Gear.Neutral && this.GetDirection() !== Direction.Forward) {
                this.direction = Direction.Forward
            }
            return true
        }

        return false
    }
}
