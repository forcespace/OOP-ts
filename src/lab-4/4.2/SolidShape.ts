import {Shape} from './Shape'

export interface SolidShape extends Shape {
    getFillColor(): string
}