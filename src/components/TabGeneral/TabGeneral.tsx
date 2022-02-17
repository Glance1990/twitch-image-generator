import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { useActions } from '../../hooks/useActions'
import InputElement from '../InputElement/InputElement'
import Tab from '../Tab/Tab'
import { TabGeneralProps } from './TabGeneral.props'

// Styles
import Styling from './TabGeneral.styles'

function TabGeneral({ openTab }: TabGeneralProps): JSX.Element {
    const {
        canvasText,
        fontWeight,
        fontSize,
        iconScale,
        fontFamily,
        fontStyle,
    } = useAppSelector((state) => state.canvasReducer)
    const {
        updateCanvasText,
        updateCanvasFontWeight,
        updateCanvasFontSize,
        updateCanvasIconScale,
        updateCanvasFontStyle,
        updateCanvasIconState,
        updateFontAsync,
    } = useActions()

    const dispatch = useDispatch()
    return (
        <div>
            <Tab title="General" opened={openTab}>
                <h3>Text options</h3>
                <div className="option-wraper">
                    <InputElement
                        value={canvasText}
                        label="Text input"
                        type="text"
                        updateValue={updateCanvasText}
                    />
                    <div className="select-wrapper">
                        <p>Font Family</p>
                        <select
                            onChange={(e) =>
                                dispatch(updateFontAsync(e.target.value))
                            }
                            value={fontFamily}
                        >
                            <option value="Oswald">Oswald</option>
                            <option value="Bonbon">Bonbon</option>
                            <option value="Lora">Lora</option>
                            <option value="Roboto">Roboto</option>
                        </select>
                    </div>
                </div>
                <div className="option-wraper">
                    <InputElement
                        value={fontWeight}
                        label="Font weight"
                        type="range"
                        updateValue={updateCanvasFontWeight}
                        min={100}
                        max={900}
                        step={100}
                    />
                    <InputElement
                        value={fontSize}
                        label="Font size"
                        type="range"
                        updateValue={updateCanvasFontSize}
                        min={20}
                        max={70}
                        step={1}
                    />
                </div>
                <div className="option-wraper">
                    <button
                        onClick={() => updateCanvasFontStyle()}
                        type="button"
                        className="italic-button"
                        style={
                            fontStyle
                                ? { fontStyle: 'italic' }
                                : { fontStyle: 'normal' }
                        }
                    >
                        Style Italic
                    </button>
                </div>
                <h3>Icon</h3>
                <div className="option-wraper">
                    <div className="Icon">
                        <span>Icon </span>
                        <label htmlFor="disableIcon">
                            Disable Icon{' '}
                            <input
                                id="disableIcon"
                                type="checkbox"
                                onChange={(e) =>
                                    updateCanvasIconState(e.target.checked)
                                }
                            />
                        </label>
                    </div>
                    <InputElement
                        value={iconScale}
                        label="Icon scale"
                        type="range"
                        updateValue={updateCanvasIconScale}
                        min={1}
                        max={100}
                        step={1}
                    />
                </div>
            </Tab>
        </div>
    )
}

export default Styling(TabGeneral)
