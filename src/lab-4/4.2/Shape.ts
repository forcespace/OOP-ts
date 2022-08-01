import {CanvasDrawable} from './CanvasDrawable'

export interface Shape extends CanvasDrawable{
    getArea(): number
    getPerimeter(): number
    getOutlineColor(): string
    toString(): string
}