import { combineReducers } from 'redux'
import restaurantsReducer from './home/restaurantsReducer'

const rootReducer = combineReducers({restaurants: restaurantsReducer}) 

export default rootReducer