import { useAppSelector } from '../../hooks/redux'
import { useActions } from '../../hooks/useActions'
import Tab from '../Tab/Tab'
import InputElement from '../InputElement/InputElement'
import { TabPositioningProps } from './TabPositioning.props'

// Styles
import Styling from './TabPositioning.styles'

function TabPositioning({ openTab }: TabPositioningProps): JSX.Element {
    const {
        panelHeight,
        horizontalPositionText,
        verticalPositionText,
        horizontalPositionIcon,
        verticalPositionIcon,
    } = useAppSelector((state) => state.canvasReducer)
    const {
        updateCanvasPanelHeight,
        updateCanvasHorizontalPositionText,
        updateCanvasVerticalPositionText,
        updateCanvasHorizontalPositionIcon,
        updateCanvasVerticalPositionIcon,
    } = useActions()
    return (
        <Tab title="Positioning" opened={openTab}>
            <h3>General</h3>
            <div className="option-wraper">
                <InputElement
                    value={panelHeight}
                    label="Panel Height"
                    type="range"
                    updateValue={updateCanvasPanelHeight}
                    min={60}
                    max={85}
                    step={1}
                />
            </div>
            <h3>Text</h3>
            <div className="option-wraper">
                <InputElement
                    value={horizontalPositionText}
                    label="Horizontal Position"
                    type="range"
                    updateValue={updateCanvasHorizontalPositionText}
                    min={-10}
                    max={150}
                    step={1}
                />
                <InputElement
                    value={verticalPositionText}
                    label="Vertical Position"
                    type="range"
                    updateValue={updateCanvasVerticalPositionText}
                    min={-40}
                    max={40}
                    step={1}
                />
            </div>
            <h3>Icon</h3>
            <div className="option-wraper">
                <InputElement
                    value={horizontalPositionIcon}
                    label="Horizontal Position Offset"
                    type="range"
                    updateValue={updateCanvasHorizontalPositionIcon}
                    min={-50}
                    max={50}
                    step={1}
                />
                <InputElement
                    value={verticalPositionIcon}
                    label="Vertical Position Offset
                "
                    type="range"
                    updateValue={updateCanvasVerticalPositionIcon}
                    min={-50}
                    max={50}
                    step={1}
                />
            </div>
        </Tab>
    )
}

export default Styling(TabPositioning)
