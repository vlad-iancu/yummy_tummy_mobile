import { DISPLAY_MODAL } from '../Constants'
export default function modal(state = { show: false, text: "" }, action) {
    if (action.type === DISPLAY_MODAL) {
        return Object.assign({}, state, action.payload)
    }
    return state
}