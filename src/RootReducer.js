import { combineReducers } from 'redux'
import modal from './alert-modal/ModalReducer'
import loading from './utils/LoadingReducer'

const rootReducer = combineReducers({modal: modal, loading: loading})

export default rootReducer