import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { canvasPropsSlice } from '../store/reducers/canvas/CanvasSlice'
import { updateFontAsync } from '../store/reducers/canvas/asyncFunc/updateFontAsync'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(
        { ...canvasPropsSlice.actions, updateFontAsync },
        dispatch
    )
}
