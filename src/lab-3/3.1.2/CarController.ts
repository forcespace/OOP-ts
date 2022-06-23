import {Car, Direction, Gear} from './Car'

const MESSAGES = {
    ENGINE: {
        ERROR: {
            ALREADY_TURNED_ON: 'ENGINE ALREADY TURNED ON',
            CAN_NOT_TURNED_ON: 'ENGINE CAN NOT TURNED ON',
            NOT_TURNED_ON: 'ENGINE NOT TURNED ON',
            CAN_NOT_TURNED_OFF: 'ENGINE CAN NOT TURNED OFF'
        },
        MESSAGE: {
            TURNED_ON: 'ENGINE TURNED ON',
            TURNED_OFF: 'ENGINE TURNED OFF'
        }
    },
    GEAR: {
        ERROR: {
            CAN_NOT_SET_FOR_DIRECTION: 'GEAR CAN NOT SET FOR DIRECTION',
            CAN_NOT_READ_TARGET_GEAR: 'GEAR CAN NOT READ TARGET GEAR',
            CAN_NOT_SET: 'GEAR CAN NOT SET',
            CAN_NOT_CHANGE_DIRECTION: 'GEAR CAN NOT CHANGE DIRECTION',
            CAN_NOT_SET_FOR_SPEED: 'GEAR CAN NOT SET FOR SPEED',
            NOT_EXIST: 'GEAR NOT EXIST'
        },
        MESSAGE: {
            IS_SET: 'GEAR IS SET'
        }
    },
    SPEED: {
        ERROR: {
            NOT_VALID: 'SPEED NOT VALID',
            NOT_VALID_SPEED_FOR_GEAR: 'NOT VALID SPEED FOR GEAR',
            CAN_NOT_READ_TARGET_SPEED: 'SPEED CAN NOT READ TARGET SPEED',
            CAN_NOT_SET_BECAUSE_ENGINE_TURNED_OFF: 'SPEED CAN NOT SET BECAUSE ENGINE TURNED OFF',
            CAN_NOT_INCREASE_BECAUSE_GEAR_IS_NEUTRAL: 'CAN_NOT_INCREASE_BECAUSE_GEAR_IS_NEUTRAL'
        },
        MESSAGE: {
            IS_SET: 'SPEED IS SET'
        }
    },
    OTHER: {
        ERROR: {
            UNKNOWN_COMMAND: 'UNKNOWN COMMAND'
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
                return MESSAGES.OTHER.ERROR.UNKNOWN_COMMAND
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

    private static parseSpeed(value: string) {
        const result = /^[\d]+(?:.\d+)?$/.exec(value)

        return result ? result[0] : null
    }

    private static isValidTargetSpeed(value: string) {
        return CarController.parseSpeed(value) !== null
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
            return MESSAGES.ENGINE.ERROR.ALREADY_TURNED_ON
        }
        const result = this.car.TurnOnEngine()

        if (result) {
            return MESSAGES.ENGINE.MESSAGE.TURNED_ON
        }

        return MESSAGES.ENGINE.ERROR.CAN_NOT_TURNED_ON
    }

    private turnEngineOff() {
        if (!this.car.IsTurnedOn()) {
            return MESSAGES.ENGINE.ERROR.NOT_TURNED_ON
        }

        const result = this.car.TurnOffEngine()
        if (result) {
            return MESSAGES.ENGINE.MESSAGE.TURNED_OFF
        }

        return MESSAGES.ENGINE.ERROR.CAN_NOT_TURNED_OFF
    }

    private setGear(value?: string) {
        if (!value) return MESSAGES.GEAR.ERROR.CAN_NOT_READ_TARGET_GEAR
        if (this.isValidTargetGear(value)) {
            if (!this.car.IsTurnedOn()) {
                return MESSAGES.ENGINE.ERROR.NOT_TURNED_ON
            }

            const targetGear: Gear = this.parseGear(value) as Gear

            const speed = this.car.GetSpeed()
            const direction = this.car.GetDirection()

            if (targetGear === Gear.Rear) {
                if (speed === 0) {
                    const result = this.car.SetGear(targetGear)
                    if (result) {
                        return MESSAGES.GEAR.MESSAGE.IS_SET
                    }

                    return MESSAGES.GEAR.ERROR.CAN_NOT_SET
                }

                return MESSAGES.GEAR.ERROR.CAN_NOT_SET_FOR_DIRECTION

            } else if (targetGear !== Gear.Neutral && direction === Direction.Back && speed !== 0) {
                return MESSAGES.GEAR.ERROR.CAN_NOT_CHANGE_DIRECTION
            }

            const result = this.car.SetGear(targetGear)
            if (result) {
                return MESSAGES.GEAR.MESSAGE.IS_SET
            }
            return MESSAGES.GEAR.ERROR.CAN_NOT_SET_FOR_SPEED
        }

        return MESSAGES.GEAR.ERROR.NOT_EXIST
    }

    private setSpeed(value?: string) {
        if (!value) {
            return MESSAGES.SPEED.ERROR.CAN_NOT_READ_TARGET_SPEED
        }

        if (CarController.isValidTargetSpeed(value)) {
            const targetSpeed = parseFloat(CarController.parseSpeed(value) as string)

            if (!this.car.IsTurnedOn()) {
                return MESSAGES.SPEED.ERROR.CAN_NOT_SET_BECAUSE_ENGINE_TURNED_OFF
            }

            if (this.car.GetSpeed() < targetSpeed && this.car.GetGear() === Gear.Neutral) {
                return MESSAGES.SPEED.ERROR.CAN_NOT_INCREASE_BECAUSE_GEAR_IS_NEUTRAL
            }

            const result = this.car.SetSpeed(targetSpeed)

            if (result) return MESSAGES.SPEED.MESSAGE.IS_SET
            return MESSAGES.SPEED.ERROR.NOT_VALID_SPEED_FOR_GEAR
        }

        return MESSAGES.SPEED.ERROR.NOT_VALID
    }
}