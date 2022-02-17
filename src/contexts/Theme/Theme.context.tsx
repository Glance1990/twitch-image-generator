import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from 'react'
import { THEMES } from './Theme.config'
import { Theme, ThemeType } from './Theme.model'

interface ThemeContextProps {
    themeType: ThemeType
    theme: Theme
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({
    themeType: 'dark',
    theme: THEMES.dark,
} as ThemeContextProps)

// eslint-disable-next-line react/function-component-definition
export const ThemeProvider: React.FC = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('dark')

    const toggleTheme = () => {
        setCurrentTheme((prevTheme) =>
            prevTheme === 'dark' ? 'light' : 'dark'
        )
    }

    return (
        <ThemeContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                themeType: currentTheme,
                theme: THEMES[currentTheme],
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
