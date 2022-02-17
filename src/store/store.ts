// Core
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Reducers
import canvasReducer from './reducers/canvas/CanvasSlice'

export const rootReducer = combineReducers({
    canvasReducer,
})

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
    })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
