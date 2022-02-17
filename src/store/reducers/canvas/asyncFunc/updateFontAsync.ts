import { createAsyncThunk } from '@reduxjs/toolkit'
import WebFont from 'webfontloader'

interface Map {
    [key: string]: string
}

const fontFamilyObj: Map = {
    Oswald: 'Oswald',
    Bonbon: 'Bonbon',
    Lora: 'Lora',
    Roboto: 'Roboto',
}

export const updateFontAsync = createAsyncThunk(
    'canvas/updateFontFamily',
    async (fontFamilyName: string) => {
        WebFont.load({
            google: {
                families: [fontFamilyObj[fontFamilyName]],
            },
            active() {
                return fontFamilyName
            },
        })

        /* eslint no-promise-executor-return: "off" */
        await new Promise((resolve) => setTimeout(resolve, 300))

        return fontFamilyName
    }
)
