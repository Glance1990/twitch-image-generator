import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction'
import React from 'react'

export interface TabGeneralProps {
    openTab: string
    updateCanvasFontWeight: ActionCreatorWithPayload<string, string>
    changeFontStyleItalic: () => void
    setIconState: (value: React.SetStateAction<boolean>) => void
}
