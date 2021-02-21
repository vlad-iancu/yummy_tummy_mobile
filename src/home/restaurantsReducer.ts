import { ADD_RESTAURANTS, SET_RESTAURANTS } from "../Constants";
import { Action } from "../utils/Action";
type Restaurant = {
    id: number,
    location: number,
    name: string
}
interface RestaurantsPayload {
    restaurants: Restaurant[]
}
export default function restaurantsReducer(state : Array<Restaurant> = [], action: Action<RestaurantsPayload>) {
    if (action.type == ADD_RESTAURANTS) {
        return [...state, action.payload.restaurants]
    }
    if (action.type == SET_RESTAURANTS) {
        return action.payload.restaurants
    }
    return state
}
export type { Restaurant }