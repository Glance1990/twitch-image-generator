// eslint-disable-next-line no-shadow
export enum Color {
    SKY_LIGHT = '#d5e4eb',
    LIGHT_BLACK = '#121418',
    LIGHT_GREY = '#8090AC',
    MEDIUM_GRAY = '#a0b1b8',
    MEDIUM_GRAY_HOWER = '#7f8c90',
    GREY = '#191d24',
    GRAY_HOVER = '#3e4757',
    DEEP_GRAY = '#2e384d',
    DEEP_GRAY_HOVER = '#424e67',
    LIGHT_BLUE = '#5352ed',
    WHITE = '#FFFFFF',
    BLACK = '#000000',
    RED = '#e6004e',
    GREY_SECOND = '#181b21',
    GREY_THIRD = '#282d37',
    GREY_THOURTH = '#c6d5dc',
}

export type ThemeType = 'dark' | 'light'

export interface Theme {
    '--primary': Color
    '--background': Color
    '--text-color': Color
    '--tab-color': Color
    '--tab-color-hover': Color
    '--tab-color-active': Color
    '--white': Color
    '--black': Color
    '--accent': Color
    '--light-grey': Color
    '--theme-button': Color
    '--theme-button-hover': Color
    '--theme-input': Color
    '--theme-input-hover': Color
}
