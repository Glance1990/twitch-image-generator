/* eslint-disable no-console */
import { useRef, useEffect, useState } from 'react'

// Components
import CustomizePanel from './components/CustomizePanel/CustomizePanel'
import DemonstrationPanel from './components/DemonstrationPanel/DemonstrationPanel'

// Custom hooks
import { useAppSelector } from './hooks/redux'

// Canvas draw methods
import {
    drawIcon,
    drawText,
    saveCanvasImage,
    drawBorder,
} from './canvasMethods'

// Types
import { ButtonIcons } from './components/Button/Button.props'
// import

// Styles
import Styling from './App.styles'
import TabGeneral from './components/TabGeneral/TabGeneral'
import TabEffects from './components/TabEffects/TabEffects'
import TabColors from './components/TabColors/TabColors'
import TabPositioning from './components/TabPositioning/TabPositioning'
import { useTheme } from './contexts/Theme/Theme.context'
import { themeInlineStyles } from './utils/themeInlineStyles'

interface AppProps {
    className: string
}

function App({ className }: AppProps) {
    const {
        canvasText,
        fontWeight,
        iconScale,
        fontSize,
        fontFamily,
        fontStyle,
        iconStateDisabled,
        iconShadowState,
        iconShadowAngle,
        borderRadius,
        panelHeight,
        horizontalPositionText,
        verticalPositionText,
        horizontalPositionIcon,
        verticalPositionIcon,
        canvasTextColor,
        canvasTextBackgroundColor,
        canvasIconBackgroundColor,
        canvasIconColor,
        canvasIconShadowColor,
    } = useAppSelector((state) => state.canvasReducer)

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [imgSrc, setImageSrc] = useState('')

    const { theme } = useTheme()

    // Save image
    const saveImage = () => {
        if (canvasRef.current) {
            saveCanvasImage(canvasRef.current, setImageSrc)
        }
    }

    // draw icon on canvas
    useEffect(() => {
        if (!canvasRef.current) return
        drawIcon(
            canvasRef.current,
            iconStateDisabled,
            iconScale,
            iconShadowState,
            iconShadowAngle,
            canvasIconBackgroundColor,
            canvasIconShadowColor,
            horizontalPositionIcon,
            verticalPositionIcon,
            canvasIconColor
        )
        drawBorder(canvasRef.current, 5, borderRadius, 'green')
    }, [
        iconStateDisabled,
        iconScale,
        iconShadowState,
        iconShadowAngle,
        canvasIconBackgroundColor,
        canvasIconShadowColor,
        horizontalPositionIcon,
        verticalPositionIcon,
        canvasIconColor,
        borderRadius,
    ])

    // const [fontFamily, setFontFamily] = useState('Oswald')

    // draw text on canvas
    useEffect(() => {
        if (!canvasRef.current) return
        drawText(
            canvasRef.current,
            fontStyle,
            fontWeight,
            fontSize,
            fontFamily,
            canvasText,
            iconStateDisabled,
            horizontalPositionText,
            verticalPositionText,
            canvasTextBackgroundColor,
            canvasTextColor
        )
        drawBorder(canvasRef.current, 5, borderRadius, 'green')
    }, [
        fontStyle,
        fontWeight,
        fontSize,
        fontFamily,
        canvasText,
        iconStateDisabled,
        horizontalPositionText,
        verticalPositionText,
        panelHeight,
        canvasTextBackgroundColor,
        canvasTextColor,
        borderRadius,
    ])

    // draw border
    useEffect(() => {
        if (!canvasRef.current) return
        drawBorder(canvasRef.current, 5, borderRadius, 'green')
    }, [borderRadius])

    const [openTab, setTab] = useState('General')

    const changeTab = (title: string) => {
        setTab(title)
    }

    // Add theme inline styles
    useEffect(() => {
        const addThemeInlineStyles = themeInlineStyles(theme)

        return () => {
            addThemeInlineStyles()
        }
    }, [theme])

    return (
        <div className={className}>
            <CustomizePanel
                ButtonIcons={ButtonIcons}
                changeTab={changeTab}
                openTab={openTab}
            >
                <TabGeneral openTab={openTab} />
                <TabEffects openTab={openTab} />
                <TabColors openTab={openTab} />
                <TabPositioning openTab={openTab} />
            </CustomizePanel>
            <DemonstrationPanel
                href={imgSrc}
                canvasRef={canvasRef}
                panelHeight={panelHeight}
                saveImage={saveImage}
            />
        </div>
    )
}

export default Styling(App)
