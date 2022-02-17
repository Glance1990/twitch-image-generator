import { ButtonProps } from './Button.props'

// Components
import IconElement from '../IconElement/IconElement'

// Styles
import Styling from './Button.styles'

function Button({
    title,
    icon,
    clickHandler,
    className,
    activeTab,
}: ButtonProps): JSX.Element {
    return (
        <button
            type="button"
            onClick={() => clickHandler(title)}
            className={`${activeTab === title ? 'active' : ''} ${className}`}
        >
            {icon ? <IconElement title={icon} /> : null}
            <span>{title}</span>
        </button>
    )
}

export default Styling(Button)
