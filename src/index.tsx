import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
import './index.css'
import App from './App'
import { ThemeProvider } from './contexts/Theme/Theme.context'

// Context

const store = setupStore()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
