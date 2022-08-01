import {CustomCanvas} from './CustomCanvas'

export interface CanvasDrawable {
    draw(canvas: CustomCanvas): void
}