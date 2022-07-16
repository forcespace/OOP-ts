import {Shape} from './Shape'

interface SolidShape extends Shape {
    getFillColor(): string
}

export {
    SolidShape,
}