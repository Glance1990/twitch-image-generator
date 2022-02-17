import React from 'react'

export interface TabEffectsProps {
    openTab: string
    shadowState: boolean
    setIconShadowState: (value: React.SetStateAction<boolean>) => void
}
