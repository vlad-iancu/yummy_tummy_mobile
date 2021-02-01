import { combineReducers } from 'redux'
import loading from './utils/LoadingReducer'

const rootReducer = combineReducers({loading: loading})

export default rootReducer