import {
    GiSettingsKnobs,
    GiPaintBrush,
    GiMagickTrick,
    GiPositionMarker,
} from 'react-icons/gi'
import { IconElementProps } from './IconElement.props'

function IconElement({ title }: IconElementProps): JSX.Element {
    const renderIcon = () => {
        switch (title) {
            case 'GiSettingsKnobs':
                return <GiSettingsKnobs />
            case 'GiPaintBrush':
                return <GiPaintBrush />
            case 'GiMagickTrick':
                return <GiMagickTrick />
            case 'GiPositionMarker':
                return <GiPositionMarker />
            default:
                return null
        }
    }

    return <>{renderIcon()}</>
}

export default IconElement
