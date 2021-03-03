import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../Store"
import { UiActions } from "../UISlice"
import { ProfileUpdatePayload, ProfileUpdateArgs } from "./ProfileTypes"

export const fetchProfileAsyncThunk = createAsyncThunk<ProfileUpdatePayload, string>("profile/fetchProfile", async (token, thunkApi) => {
    const response = (await axios.get("/user", { headers: { Authorization: `Bearer ${token}` } })).data
    return response
})

export const updateProfileAsyncThunk = createAsyncThunk<ProfileUpdatePayload, ProfileUpdateArgs, {state: RootState}>(
    "profile/updateProfile",
    async ({ password, email, phone, newName, newPhoto }, thunkApi) => {
        let body = new FormData()
        body.append("password", password)
        body.append("email", email)
        body.append("phone", phone)
        if (newName)
            body.append("name", newName)
        if (newPhoto)
            body.append("profilePicture", {
                uri: newPhoto?.uri,
                name: newPhoto?.fileName,
                type: newPhoto?.type,
            })
        thunkApi.dispatch(UiActions.loading(true))
        let newProfile = await axios.put("/user_profile", body)
        thunkApi.dispatch(UiActions.loading(false))

        return newProfile.data
    }
)