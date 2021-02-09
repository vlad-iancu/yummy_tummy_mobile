import { combineReducers } from 'redux'

const rootReducer = combineReducers({loading: (state = {loading: false}, action) => state}) 

export default rootReducer