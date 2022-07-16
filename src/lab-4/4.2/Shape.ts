import {CanvasDrawable} from './CanvasDrawable'

interface Shape extends CanvasDrawable{
    getArea(): number
    getPerimeter(): number
    getOutlineColor(): string
    toString(): string
}

export {
    Shape,
}