import {Car, Direction, Gear} from './Car'

const ERROR = {
    ENGINE_ALREADY_TURNED_ON: 'ENGINE_ALREADY_TURNED_ON',
    ENGINE_CAN_NOT_TURNED_ON: 'ENGINE_CAN_NOT_TURNED_ON',
    ENGINE_NOT_TURNED_ON: 'ENGINE_NOT_TURNED_ON',
    ENGINE_CAN_NOT_TURNED_OFF: 'ENGINE_CAN_NOT_TURNED_OFF',
    GEAR_NOT_EXIST: 'GEAR_NOT_EXIST',
    GEAR_NOT_CORRECT: 'GEAR_NOT_CORRECT',
    GEAR_CAN_NOT_SET_FOR_DIRECTION: 'GEAR_CAN_NOT_SET_FOR_DIRECTION',
    GEAR_CAN_NOT_SET_FOR_SPEED: 'GEAR_CAN_NOT_SET_FOR_SPEED',
    GEAR_CAN_NOT_CHANGE_DIRECTION: 'GEAR_CAN_NOT_CHANGE_DIRECTION',
    GEAR_CAN_NOT_SET: 'GEAR_CAN_NOT_SET',
    GEAR_CAN_NOT_READ_TARGET_GEAR: 'GEAR_CAN_NOT_READ_TARGET_GEAR',
    SPEED_CAN_NOT_READ_TARGET_SPEED: 'SPEED_CAN_NOT_READ_TARGET_SPEED',
    SPEED_NOT_VALID: 'SPEED_NOT_VALID',
    SPEED_CAN_NOT_SET_BECAUSE_ENGINE_TURNED_OFF: 'SPEED_CAN_NOT_SET_BECAUSE_ENGINE_TURNED_OFF',
    SPEED_CAN_NOT_INCREASE_BECAUSE_GEAR_IS_NEUTRAL: 'SPEED_CAN_NOT_INCREASE_BECAUSE_GEAR_IS_NEUTRAL',
    UNKNOWN_COMMAND: 'UNKNOWN_COMMAND'
}

const MESSAGE = {
    ENGINE_TURNED_ON: 'ENGINE_TURNED_ON',
    ENGINE_TURNED_OFF: 'ENGINE_TURNED_OFF',
    GEAR_IS_SET: 'GEAR_IS_SET',
    SPEED_IS_SET: 'SPEED_IS_SET'
}

const MESSAGES_2 = {
    GEAR: {
        ERROR: {
            CAN_NOT_SET_FOR_DIRECTION: 'GEAR CAN NOT SET FOR DIRECTION'
        },
        MESSAGE: {
            IS_SET: 'GEAR IS SET'
        }
    },
    SPEED: {
        ERROR: {
            NOT_VALID: 'SPEED NOT VALID',
            NOT_VALID_FOR_GEAR: 'NOT_VALID_FOR_GEAR'
        },
        MESSAGE: {
            IS_SET: 'SPEED IS SET'
        }
    }
}

export class CarController {
    private readonly car: Car

    constructor(car: Car) {
        this.car = car
    }

    public executeCommand(command: string, value?: string) {
        switch (command) {
            case 'Info' : {
                return this.getCarInfo()
            }
            case 'EngineOn' : {
                return this.turnEngineOn()
            }
            case 'EngineOff' : {
                return this.turnEngineOff()
            }
            case 'SetGear' : {
                return this.setGear(value)
            }
            case 'SetSpeed' : {
                return this.setSpeed(value)
            }
            default : {
                return ERROR.UNKNOWN_COMMAND
            }
        }
    }

    private parseGear(value: string) {
        const result = /^(?:-\s?)?\d$/.exec(value)

        return result ? result[0] : null
    }

    private isValidTargetGear(value: string) {
        return this.parseGear(value) !== null
    }

    private parseSpeed(value: string) {
        const result = /^[\d]+(?:.\d+)?$/.exec(value)

        return result ? result[0] : null
    }

    private isValidTargetSpeed(value: string) {
        return this.parseSpeed(value) !== null
    }

    private getCarInfo() {
        const engineTurnedOn = this.car.IsTurnedOn()
        const direction = this.car.GetDirection()
        const speed = this.car.GetSpeed()
        const gear = this.car.GetGear()

        return `car status:
engineTurnedOn: ${engineTurnedOn}
direction: ${direction}
speed: ${speed}
gear: ${gear}`
    }

    private turnEngineOn() {
        if (this.car.IsTurnedOn()) {
            return ERROR.ENGINE_ALREADY_TURNED_ON
        }
        const result = this.car.TurnOnEngine()

        if (result) {
            return MESSAGE.ENGINE_TURNED_ON
        }

        return ERROR.ENGINE_CAN_NOT_TURNED_ON
    }

    private turnEngineOff() {
        if (!this.car.IsTurnedOn()) {
            return ERROR.ENGINE_NOT_TURNED_ON
        }

        const result = this.car.TurnOffEngine()
        if (result) {
            return MESSAGE.ENGINE_TURNED_OFF
        }

        return ERROR.ENGINE_CAN_NOT_TURNED_OFF
    }

    private setGear(value?: string) {
        if (!value) return ERROR.GEAR_CAN_NOT_READ_TARGET_GEAR
        if (this.isValidTargetGear(value)) {
            if (!this.car.IsTurnedOn()) {
                return ERROR.ENGINE_NOT_TURNED_ON
            }

            const targetGear: Gear = this.parseGear(value) as Gear

            const speed = this.car.GetSpeed()
            const direction = this.car.GetDirection()

            if (targetGear === Gear.Rear) {
                if (speed === 0) {
                    const result = this.car.SetGear(targetGear)
                    if (result) {
                        return MESSAGE.GEAR_IS_SET
                    }
                    return ERROR.GEAR_CAN_NOT_SET
                }

                return ERROR.GEAR_CAN_NOT_SET_FOR_DIRECTION
            } else if (targetGear !== Gear.Neutral && direction === Direction.Back && speed !== 0) {
                return ERROR.GEAR_CAN_NOT_CHANGE_DIRECTION
            }

            const result = this.car.SetGear(targetGear)
            if (result) {
                return MESSAGE.GEAR_IS_SET
            }
            return ERROR.GEAR_CAN_NOT_SET_FOR_SPEED
        }

        return ERROR.GEAR_NOT_EXIST


    }

    private setSpeed(value?: string) {
        if (!value) {
            return ERROR.SPEED_CAN_NOT_READ_TARGET_SPEED
        }

        if (this.isValidTargetSpeed(value)) {
            const targetSpeed = parseFloat(this.parseSpeed(value) as string)

            if (!this.car.IsTurnedOn()) {
                return ERROR.SPEED_CAN_NOT_SET_BECAUSE_ENGINE_TURNED_OFF
            }

            if (this.car.GetSpeed() < targetSpeed && this.car.GetGear() === Gear.Neutral) {
                return ERROR.SPEED_CAN_NOT_INCREASE_BECAUSE_GEAR_IS_NEUTRAL
            }

            const result = this.car.SetSpeed(targetSpeed)

            if (result) return MESSAGES_2.SPEED.MESSAGE.IS_SET
            return MESSAGES_2.SPEED.ERROR.NOT_VALID_FOR_GEAR
        }

        return ERROR.SPEED_NOT_VALID
    }
}