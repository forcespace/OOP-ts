export enum Direction {
    Back = -1,
    Stop,
    Forward
}

export enum Gear {
    Rear = '-1',
    Neutral = '0',
    First = '1',
    Second = '2',
    Third = '3',
    Fourth = '4',
    Fifth = '5'
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
        this.engineTurnedOn = true
        return true
    }

    public TurnOffEngine(): boolean {
        if (this.GetGear() === Gear.Neutral && this.GetSpeed() === 0) {
            this.engineTurnedOn = false
            return true
        }
        return false
    }

    public SetGear(targetGear: Gear): boolean {
        if (targetGear === Gear.Rear) {
            if (this.GetSpeed() === 0) {
                this.gear = Gear.Rear

                return true
            }

            return false

        } else if (targetGear === Gear.Neutral) {

        } else if (targetGear === Gear.First && (this.direction === Direction.Back || this.direction === Direction.Stop)) {
            if (this.GetSpeed() === 0) {
                this.gear = Gear.First

                return true
            }

            return false
        }

        const speed = this.GetSpeed()
        const speedLimit = GEAR_LIMITS[targetGear]
        if (speedLimit.min <= speed && speedLimit.max >= speed) {
            this.gear = targetGear
            return true
        }

        return false
    }

    public SetSpeed(targetSpeed: number): boolean {
        const currentGear = this.GetGear()

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