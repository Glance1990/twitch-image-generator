import React from 'react'
// import { CanvasActionTypes } from '../../store/reducers/canvasProps/types'

export interface TabColorsProps {
    openTab: string
    canvasTextColor: string
    shadowColor: string
    updateShadowColor: React.Dispatch<React.SetStateAction<string>>
    textBackgroundColor: string
    updateTextBackgroundColor: React.Dispatch<React.SetStateAction<string>>
    iconColor: string
    updateIconColor: React.Dispatch<React.SetStateAction<string>>
    color: string
    updateColor: React.Dispatch<React.SetStateAction<string>>
}
