import { Color } from './Theme.model'
import { ThemeType, Theme } from './Theme.model'

export const THEMES: Record<ThemeType, Theme> = {
    light: {
        '--primary': Color.LIGHT_BLUE,
        '--background': Color.SKY_LIGHT,
        '--text-color': Color.BLACK,
        '--white': Color.WHITE,
        '--black': Color.BLACK,
        '--accent': Color.RED,
        '--tab-color': Color.DEEP_GRAY,
        '--tab-color-hover': Color.DEEP_GRAY_HOVER,
        '--tab-color-active': Color.LIGHT_BLUE,
        '--light-grey': Color.LIGHT_GREY,
        '--theme-button': Color.MEDIUM_GRAY,
        '--theme-button-hover': Color.MEDIUM_GRAY_HOWER,
        '--theme-input': Color.GREY_THOURTH,
        '--theme-input-hover': Color.MEDIUM_GRAY,
    },
    dark: {
        '--primary': Color.LIGHT_BLUE,
        '--background': Color.LIGHT_BLACK,
        '--text-color': Color.WHITE,
        '--white': Color.WHITE,
        '--black': Color.BLACK,
        '--accent': Color.RED,
        '--tab-color': Color.DEEP_GRAY,
        '--tab-color-hover': Color.DEEP_GRAY_HOVER,
        '--tab-color-active': Color.LIGHT_BLUE,
        '--light-grey': Color.LIGHT_GREY,
        '--theme-button': Color.GREY,
        '--theme-button-hover': Color.GRAY_HOVER,
        '--theme-input': Color.GREY_SECOND,
        '--theme-input-hover': Color.GREY_THIRD,
    },
}
