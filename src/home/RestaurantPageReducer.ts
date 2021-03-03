import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantsPayload, RestaurantState } from "./RestaurantTypes";


const addRestaurantPage = (state: Draft<RestaurantState>, { payload }: PayloadAction<RestaurantsPayload>) => {
    const pageToAdd = { page: payload.page, restaurants: payload.restaurants }
    if (payload.error) {
        state.error = payload.error
        return
    }
    if(state.query != payload.query) {
        console.log("RestaurantsReducer: We changed the query, the new query will be " + payload.query)
        state.restaurants = [pageToAdd]
        state.query = payload.query
        state.nextPage = 2
        return
    }
    if (state.endReached || payload.endReached) {
        state.endReached = true
        return
    }
    
    state.restaurants = state.restaurants.filter(({ page }) => {
        return page != pageToAdd.page
    })
    state.restaurants.push(pageToAdd)
    state.restaurants.sort((r1, r2) => {
        return r1.page - r2.page
    })
    state.nextPage = state.restaurants.reduce((nextPage, {page}) => {
        if(page === nextPage) return nextPage + 1
        else return nextPage
    },1)

}
export default addRestaurantPage