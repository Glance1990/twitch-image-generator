import React from 'react'
import { ButtonIcons } from '../Button/Button.props'

export interface CustomizePanelProps {
    changeTab: (title: string) => void
    ButtonIcons: typeof ButtonIcons
    openTab: string
    children: React.ReactNode
    className: string
}
