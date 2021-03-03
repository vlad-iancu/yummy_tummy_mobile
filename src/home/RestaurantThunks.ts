import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../Store'
import { RestaurantPageArgs, RestaurantsPayload } from './RestaurantTypes'
import { UiActions } from '../UISlice'

const fetchNextRestaurantPageThunk = createAsyncThunk<
    RestaurantsPayload,
    RestaurantPageArgs,
    { state: RootState }
>("restaurants/fetch", async ({ token,pageSize,q }, thunkApi) => {
    let { query } = thunkApi.getState().restaurants
    let page = thunkApi.getState().restaurants.nextPage
    console.log("RestaurantThunk: query is " + query)
    if (q != null) page = 1
    else q = query
    console.log(`Attempting to fetch page ${page} with q \"${q}\" and query ${query}`)
    thunkApi.dispatch(UiActions.loading(true))
    const response = (await axios.get("/restaurants", { params: { q, pageSize, page }, headers: { Authorization: `Bearer ${token}` } })).data
    thunkApi.dispatch(UiActions.loading(false))
    return { ...response, endReached: response.restaurants.length === 0, page, query: q }
})

export { fetchNextRestaurantPageThunk }