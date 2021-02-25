import { applyMiddleware, combineReducers } from 'redux'
import restaurantsReducer from './home/restaurantsReducer'
import profileReducer from './profile/profileReducer'

const rootReducer = combineReducers({restaurants: restaurantsReducer, profile: profileReducer}) 

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>