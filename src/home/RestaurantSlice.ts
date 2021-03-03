import { createSlice } from "@reduxjs/toolkit";
import addRestaurantPage from "./RestaurantPageReducer";
import restaurantsReducer from "./restaurantsReducer";
import { fetchNextRestaurantPageThunk } from "./RestaurantThunks";
import { RestaurantState } from "./RestaurantTypes";

const initialState: RestaurantState = {
    query: "",
    restaurants: [],
    pagesLoaded: 0,
    endReached: false,
    nextPage: 1
}
const restaurantSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchNextRestaurantPageThunk.fulfilled, addRestaurantPage)
    }
})

export default restaurantSlice.reducer