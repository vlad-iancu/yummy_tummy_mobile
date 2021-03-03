import { configureStore } from '@reduxjs/toolkit'
import restaurantsReducer from './home/RestaurantSlice'
import profileReducer from './profile/ProfileSlice'
import uiReducer from './UISlice'
import authReducer from './login/AuthSlice'
const store = configureStore({
    reducer: {
        profile: profileReducer,
        restaurants: restaurantsReducer,
        ui: uiReducer,
        auth: authReducer
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>