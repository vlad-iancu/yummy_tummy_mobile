import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileAsyncThunk, updateProfileAsyncThunk } from "./ProfileThunks";
import { ProfileState, ProfileUpdatePayload } from "./ProfileTypes";

const initialState: ProfileState = {
    id: 0,
    loaded: false,
}
const updateProfile = (state: Draft<ProfileState>, action: PayloadAction<ProfileUpdatePayload>) => {
    Object.assign(state, action.payload, { loaded: true })
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchProfileAsyncThunk.fulfilled, updateProfile)
        builder.addCase(updateProfileAsyncThunk.fulfilled, updateProfile)
    }  
})

export default profileSlice.reducer
