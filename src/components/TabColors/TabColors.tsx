import { useAppSelector } from '../../hooks/redux'
import { useActions } from '../../hooks/useActions'
import ColorPicker from '../ColorPicker/ColorPicker'
import Tab from '../Tab/Tab'
import { TabColorsProps } from './TabColors.props'

// Styles
import Styling from './TabColors.styles'

function TabColors({ openTab }: TabColorsProps): JSX.Element {
    const {
        canvasTextColor,
        canvasTextBackgroundColor,
        canvasIconBackgroundColor,
        canvasIconColor,
        canvasIconShadowColor,
    } = useAppSelector((state) => state.canvasReducer)
    const {
        updateCanvasTextColor,
        updateCanvasTextBackgroundColor,
        updateCanvasIconBackgroundColor,
        updateCanvasIconColor,
        updateCanvasIconShadowColor,
    } = useActions()
    return (
        <Tab title="Colors" opened={openTab}>
            <h3>Text</h3>
            <div className="option-wraper-colors">
                <div className="color-palet">
                    <span className="title">Text Color</span>
                    <ColorPicker
                        color={canvasTextColor}
                        onChangeHandler={updateCanvasTextColor}
                    />
                </div>
            </div>
            <h3>Background</h3>
            <div className="option-wraper-colors">
                <div className="color-palet">
                    <span className="title">Text Background Color</span>
                    <ColorPicker
                        color={canvasTextBackgroundColor}
                        onChangeHandler={updateCanvasTextBackgroundColor}
                    />
                </div>
                <div className="color-palet">
                    <span className="title">Icon Background Color</span>
                    <ColorPicker
                        color={canvasIconBackgroundColor}
                        onChangeHandler={updateCanvasIconBackgroundColor}
                    />
                </div>
            </div>
            <h3>Icon</h3>
            <div className="option-wraper-colors">
                <div className="color-palet">
                    <span className="title">Icon Color</span>
                    <ColorPicker
                        color={canvasIconColor}
                        onChangeHandler={updateCanvasIconColor}
                    />
                </div>
                <div className="color-palet">
                    <span className="title">Icon Shadow Color</span>
                    <ColorPicker
                        color={canvasIconShadowColor}
                        onChangeHandler={updateCanvasIconShadowColor}
                    />
                </div>
            </div>
        </Tab>
    )
}

export default Styling(TabColors)
