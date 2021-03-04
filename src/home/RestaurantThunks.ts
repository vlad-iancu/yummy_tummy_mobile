import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../Store'
import { RestaurantPageArgs, RestaurantsPayload } from './RestaurantTypes'
import { UiActions } from '../UISlice'
import Service from '../service/RestaurantService'
const fetchNextRestaurantPageThunk = createAsyncThunk<
    RestaurantsPayload,
    RestaurantPageArgs,
    { state: RootState }
>("restaurants/fetch", async ({ token, pageSize, q }, thunkApi) => {
    const service = new Service(thunkApi.dispatch, thunkApi.getState)
    let { query } = thunkApi.getState().restaurants
    let page = thunkApi.getState().restaurants.nextPage
    if (q != null) page = 1
    else q = query
    thunkApi.dispatch(UiActions.loading(true))
    const response = await service.fetchRestaurants({ q: q ?? "", pageSize, page })
    return { ...response, endReached: response.restaurants.length === 0, page, query: q }
})

export { fetchNextRestaurantPageThunk }