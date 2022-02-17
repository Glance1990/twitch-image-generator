import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../contexts/Theme/Theme.context'
import Button from '../Button/Button'
import { CustomizePanelProps } from './CustomizePanel.props'

// Styles
import Styling from './CustomizePanel.styles'

function CustomizePanel({
    ButtonIcons,
    openTab,
    changeTab,
    children,
    className,
}: CustomizePanelProps): JSX.Element {
    const { toggleTheme } = useTheme()

    return (
        <div className={`${className} col customize-tab col-xs`}>
            <div>
                <h1 className="nod_title">Customize</h1>
                <p className="nod_text">
                    Create your custom panel by controling settings in each tab.
                </p>
            </div>
            <button
                className="themeToggler"
                type="button"
                onClick={() => toggleTheme()}
            >
                <FontAwesomeIcon icon={faLightbulb} className="icon" />
            </button>
            <div>
                <Button
                    title="General"
                    clickHandler={changeTab}
                    icon={ButtonIcons.settings}
                    activeTab={openTab}
                />
                <Button
                    title="Effects"
                    clickHandler={changeTab}
                    icon={ButtonIcons.wand}
                    activeTab={openTab}
                />
                <Button
                    title="Colors"
                    clickHandler={changeTab}
                    icon={ButtonIcons.brush}
                    activeTab={openTab}
                />
                <Button
                    title="Positioning"
                    clickHandler={changeTab}
                    icon={ButtonIcons.position}
                    activeTab={openTab}
                />
            </div>
            {children}
        </div>
    )
}

export default Styling(CustomizePanel)
