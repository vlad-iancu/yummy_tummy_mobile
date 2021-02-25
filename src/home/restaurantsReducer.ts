import axios from "axios";
import { max } from "react-native-reanimated";
import { RESTAURANTS_ADD } from "../Constants";
import { Action } from "../utils/Action";
type Restaurant = {
    id: number,
    location: number,
    name: string,
    photoUrl: string,
    thumbnailUrl: string,
}
interface RestaurantsPayload {
    restaurants: Array<Restaurant>,
    query?: string,
    page: number
    error?: any,
    endReached: boolean
}
export interface RestaurantState {
    pagesLoaded: number,
    restaurants: Array<{
        page: number,
        restaurants: Array<Restaurant>
    }>
    query?: string,
    error?: any,
    endReached: boolean
}
export default function restaurantsReducer(
    state: RestaurantState = { pagesLoaded: 0, restaurants: [{ page: 0, restaurants: [] }], endReached: false, query: "" },
    action: Action<RestaurantsPayload>): RestaurantState {
    if (action.payload?.error) {
        return Object.assign({}, state, { error: action.payload.error })
    }
    if (action.type == RESTAURANTS_ADD) {
        if (action.payload.query === state.query) {
            let restaurantsToAdd = action.payload.restaurants
            let pageToAdd = action.payload.page
            let restaurantPages = state.restaurants
            console.log("We are adding to the state page " + pageToAdd)
            let newRestaurantPages = [...restaurantPages]
            let nonExistingPage = (newRestaurantPages.filter((restaurantPage) => {
                return restaurantPage.page === pageToAdd
            })).length === 0
            console.log("Is the page we loaded already in the state?" + !nonExistingPage)
            if (!nonExistingPage)
                newRestaurantPages = newRestaurantPages.map((restaurantPage) => {
                    if (restaurantPage.page === pageToAdd)
                        return { page: pageToAdd, restaurants: restaurantsToAdd }
                    else
                        return restaurantPage
                })
            else {
                if (restaurantsToAdd.length > 0)
                    newRestaurantPages.push({ page: pageToAdd, restaurants: restaurantsToAdd })
            }
            console.log("We are reducing " + newRestaurantPages.length + " restaurants")
            newRestaurantPages = newRestaurantPages.filter(page => page.restaurants.length > 0)
            console.log("After filtering our new Pages are:" + JSON.stringify(newRestaurantPages, undefined, 4))
            newRestaurantPages.sort((p1, p2) => p1.page - p2.page)
            console.log("After sorting our new Pages are:" + JSON.stringify(newRestaurantPages, undefined, 4))
            let missingPages = newRestaurantPages.reduce((missingPages: number[], { page }, index) => {
                if (page != index + 1) return [...missingPages, page]
                else return missingPages
            }, [])
            let nextPage = 0
            if (missingPages.length === 0)
                nextPage = newRestaurantPages.length + 1
            else nextPage = missingPages[0]
            console.log("pagesLoaded will be" + (nextPage - 1))
            console.log("Our new Pages are:" + JSON.stringify(newRestaurantPages, undefined, 4))
            return Object.assign({}, state, {
                restaurants: newRestaurantPages,
                endReached: action.payload.endReached,
                pagesLoaded: nextPage - 1,
                error: action.payload.error
            })
        }
        else {
            return Object.assign({},
                state,
                {
                    restaurants: [{ page: 1, restaurants: action.payload.restaurants }],
                    endReached: action.payload.endReached,
                    error: action.payload.error,
                    pagesLoaded: 1
                })
        }
    }
    return state
}
export type { Restaurant }

export const fetchRestaurantsThunk = (token: string, setLoading: (loading: boolean) => void, query?: string) => async (dispatch: (action: any) => void, getState: () => any) => {
    try {
        let pagesLoaded = getState().restaurants.pagesLoaded
        let searchQuery = query ?? getState().restaurants.query
        let pageToLoad = query == null ? pagesLoaded + 1 : 1
        console.log("We are loading page " + pageToLoad + " with query " + searchQuery)
        setLoading(true)
        let restaurants = (await axios.get("/restaurants", {
            headers: { Authorization: `Bearer ${token}` },
            params: { pageSize: 20, page: pageToLoad, q: searchQuery }
        })).data.restaurants
        console.log("Now query will be:" + (query ?? getState().restaurants.query))
        console.log("We fetched page " + pageToLoad + " with query " + searchQuery + " and we got " + restaurants.length + " from server")
        dispatch({
            type: RESTAURANTS_ADD, payload: {
                restaurants,
                query: searchQuery,
                endReached: restaurants.length === 0,
                page: pageToLoad
            }
        })
        setLoading(false)
    }
    catch (err) {
        dispatch({ type: RESTAURANTS_ADD, payload: { error: err } })
    }
}