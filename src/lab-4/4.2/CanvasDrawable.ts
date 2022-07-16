import {CustomCanvas} from './CustomCanvas'

interface CanvasDrawable {
    draw(canvas: CustomCanvas): void
}

export {
    CanvasDrawable
}