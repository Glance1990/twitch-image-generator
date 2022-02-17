import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateFontAsync } from './asyncFunc/updateFontAsync'

interface CanvasState {
    canvasText: string
    fontStyle: string
    fontWeight: string
    fontSize: number
    fontFamily: string
    iconStateDisabled: boolean
    iconScale: number
    iconShadowState: boolean
    iconShadowAngle: number
    borderRadius: number
    panelHeight: number
    horizontalPositionText: number
    verticalPositionText: number
    horizontalPositionIcon: number
    verticalPositionIcon: number
    // colors
    canvasTextColor: string
    canvasTextBackgroundColor: string
    canvasIconColor: string
    canvasIconBackgroundColor: string
    canvasIconShadowColor: string
    loading: boolean
}

const initialState: CanvasState = {
    canvasText: 'Lord of the rings',
    fontStyle: '',
    fontWeight: '300',
    fontSize: 40,
    fontFamily: 'Oswald',
    iconStateDisabled: false,
    iconScale: 70,
    iconShadowState: true,
    iconShadowAngle: 35,
    borderRadius: 0,
    panelHeight: 60,
    horizontalPositionText: 0,
    verticalPositionText: 0,
    horizontalPositionIcon: 0,
    verticalPositionIcon: 0,
    // colors
    canvasTextColor: '#fff000',
    canvasTextBackgroundColor: '#101220',
    canvasIconBackgroundColor: '#d94545',
    canvasIconColor: '#ffffff',
    canvasIconShadowColor: '#982525',
    loading: false,
}

export const canvasPropsSlice = createSlice({
    name: 'canvasProps',
    initialState,
    reducers: {
        updateCanvasText(state, action: PayloadAction<string>) {
            state.canvasText = action.payload
        },
        updateCanvasFontStyle(state) {
            state.fontStyle = state.fontStyle === 'italic' ? '' : 'italic'
        },
        updateCanvasFontWeight(state, action: PayloadAction<string>) {
            state.fontWeight = action.payload
        },
        updateCanvasFontSize(state, action: PayloadAction<number>) {
            state.fontSize = action.payload
        },
        updateCanvasFontFamily(state, action: PayloadAction<string>) {
            state.fontFamily = action.payload
        },
        updateCanvasIconState(state, action: PayloadAction<boolean>) {
            state.iconStateDisabled = action.payload
        },
        updateCanvasIconScale(state, action: PayloadAction<number>) {
            state.iconScale = action.payload
        },
        updateCanvasIconShadowState(state, action: PayloadAction<boolean>) {
            state.iconShadowState = action.payload
        },
        updateCanvasIconShadowAngle(state, action: PayloadAction<number>) {
            state.iconShadowAngle = action.payload
        },
        updateCanvasBorderRadius(state, action: PayloadAction<number>) {
            state.borderRadius = action.payload
        },
        updateCanvasPanelHeight(state, action: PayloadAction<number>) {
            state.panelHeight = action.payload
        },
        updateCanvasHorizontalPositionText(
            state,
            action: PayloadAction<number>
        ) {
            state.horizontalPositionText = Number(action.payload)
        },
        updateCanvasVerticalPositionText(state, action: PayloadAction<number>) {
            state.verticalPositionText = Number(action.payload)
        },
        updateCanvasHorizontalPositionIcon(
            state,
            action: PayloadAction<number>
        ) {
            state.horizontalPositionIcon = Number(action.payload)
        },
        updateCanvasVerticalPositionIcon(state, action: PayloadAction<number>) {
            state.verticalPositionIcon = Number(action.payload)
        },
        // colors
        updateCanvasTextColor(state, action: PayloadAction<string>) {
            state.canvasTextColor = action.payload
        },
        updateCanvasTextBackgroundColor(state, action: PayloadAction<string>) {
            state.canvasTextBackgroundColor = action.payload
        },
        updateCanvasIconBackgroundColor(state, action: PayloadAction<string>) {
            state.canvasIconBackgroundColor = action.payload
        },
        updateCanvasIconColor(state, action: PayloadAction<string>) {
            state.canvasIconColor = action.payload
        },
        updateCanvasIconShadowColor(state, action: PayloadAction<string>) {
            state.canvasIconShadowColor = action.payload
        },
    },
    extraReducers: (updateFontFamily) => {
        updateFontFamily
            .addCase(updateFontAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(updateFontAsync.fulfilled, (state, action) => {
                state.fontFamily = action.payload
                state.loading = false
            })
            .addCase(updateFontAsync.rejected, (state) => {
                state.loading = false
            })
    },
})

export default canvasPropsSlice.reducer
