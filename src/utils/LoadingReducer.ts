import { LOADING } from '../Constants'
export default function loading(state = { loading: false }, action) {
    if (action.type === LOADING) {
        return Object.assign({}, state, action.payload)
    }
    return state
}