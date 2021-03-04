import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "./locales/Language";
import en from './locales/en'
import { State } from "react-native-gesture-handler";
import { registerThunk } from "./register/RegisterThunk";
import { fetchNextRestaurantPageThunk } from "./home/RestaurantThunks";
import { fetchProfileAsyncThunk, updateProfileAsyncThunk } from "./profile/ProfileThunks";
import { loginAsyncThunk } from "./login/AuthThunks";
type UiState = {
    loading: boolean,
    language: Language,
    message?: any,
    handledMessage: boolean
}
const initialState: UiState = { loading: false, language: en, message: undefined, handledMessage: false }
const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        loading: {
            reducer: (state, { payload }: PayloadAction<boolean>) => { state.loading = payload },
            prepare: (loading: boolean) => { return { payload: loading } }
        },
        language: {
            reducer: (state, { payload }: PayloadAction<Language>) => { state.language = payload },
            prepare: (lang: Language) => { return { payload: lang } }
        },
        message: {
            reducer: (state, { payload }: PayloadAction<string>) => {state.message = payload; state.handledMessage = false }, 
            prepare: (err: string) => { return { payload: err } }
        },
        handleMessage: {
            reducer: (state, { payload }: PayloadAction<boolean>) => {state.handledMessage = payload},
            prepare: (handled: boolean) => {return {payload : handled}}
        },
    },
    extraReducers: builder => {
        /* builder.addCase(registerThunk.rejected, (state, action) => {state.message = action.payload; state.handledMessage = false})
        builder.addCase(fetchNextRestaurantPageThunk.rejected, (state, action) => {state.message = action.payload; state.handledMessage = false})
        builder.addCase(fetchProfileAsyncThunk.rejected, (state, action) => {state.message = action.payload; state.handledMessage = false} )
        builder.addCase(loginAsyncThunk.rejected, (state, action) => {state.message = action.payload; state.handledMessage = false} )
        builder.addCase(updateProfileAsyncThunk.rejected, (state, action) => {state.message = action.payload; state.handledMessage = false} ) */
        builder.addMatcher((action) => {return action?.error?.name === "RejectWithValue"}, (state, action) => {state.message = action.payload; state.handledMessage = false})
    }
})

const actions = uiSlice.actions

export { actions as UiActions }
export default uiSlice.reducer
