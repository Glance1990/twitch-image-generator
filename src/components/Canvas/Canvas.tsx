import { CanvasProps } from './Canvas.props'

// Styles
import Styling from './Canvas.styles'

function Canvas({
    panelHeight,
    references,
    className,
}: CanvasProps): JSX.Element {
    return (
        <div className={className}>
            <canvas width={320} height={panelHeight} ref={references} />
        </div>
    )
}

export default Styling(Canvas)
