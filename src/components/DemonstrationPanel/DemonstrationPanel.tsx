import Canvas from '../Canvas/Canvas'
import { DemonstrationPanelProps } from './DemonstrationPanel.props'

// Styles
import Styling from './DemonstrationPanel.styles'

function DemonstrationPanel({
    href,
    canvasRef,
    panelHeight,
    saveImage,
    className,
}: DemonstrationPanelProps): JSX.Element {
    return (
        <div className={`${className} col demonstration-tab`}>
            <h2 className="nod_title">Live View & Download</h2>
            <p className="nod_text">
                Check your design and download transparent .PNG panels.
            </p>
            <Canvas panelHeight={panelHeight} references={canvasRef} />
            <a
                href={href}
                className="button save-image"
                download="your-image.png"
                onClick={saveImage}
            >
                Save panel image
            </a>
        </div>
    )
}

export default Styling(DemonstrationPanel)
