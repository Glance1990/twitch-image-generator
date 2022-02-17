import { useAppSelector } from '../../hooks/redux'
import { useActions } from '../../hooks/useActions'
import InputElement from '../InputElement/InputElement'
import Tab from '../Tab/Tab'
import { TabEffectsProps } from './TabEffects.props'

// Styles
import Styling from './TabEffects.styles'

function TabEffects({ openTab }: TabEffectsProps): JSX.Element {
    const { iconShadowState, iconShadowAngle, borderRadius } = useAppSelector(
        (state) => state.canvasReducer
    )
    const {
        updateCanvasIconShadowState,
        updateCanvasIconShadowAngle,
        updateCanvasBorderRadius,
    } = useActions()

    return (
        <Tab title="Effects" opened={openTab}>
            <h3>Shadow</h3>
            <div className="option-wraper">
                <div className="Icon">
                    <label htmlFor="shadowState">
                        Enable Icon Shadow
                        <input
                            id="shadowState"
                            type="checkbox"
                            checked={iconShadowState}
                            onChange={(e) =>
                                updateCanvasIconShadowState(e.target.checked)
                            }
                        />
                    </label>
                </div>
                <InputElement
                    value={iconShadowAngle}
                    label="Icon Shadow Angle"
                    type="range"
                    updateValue={updateCanvasIconShadowAngle}
                    min={0}
                    max={360}
                    step={1}
                />
            </div>
            <h3>Border</h3>
            <div className="option-wraper">
                <InputElement
                    value={borderRadius}
                    label="Border Radius (%)"
                    type="range"
                    updateValue={updateCanvasBorderRadius}
                    min={0}
                    max={120}
                    step={1}
                />
            </div>
        </Tab>
    )
}

export default Styling(TabEffects)
