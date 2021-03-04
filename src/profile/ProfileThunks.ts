import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../Store"
import { UiActions } from "../UISlice"
import { ProfileUpdatePayload, ProfileUpdateArgs } from "./ProfileTypes"
import Service from '../service/ProfileService'
import { ProfileUpdateRequest } from "../service/Request"
import { ProfileResponse } from "../service/Response"

export const fetchProfileAsyncThunk = createAsyncThunk<ProfileUpdatePayload, undefined, { state: RootState }>("profile/fetchProfile",
    async (_, thunkApi) => {
        try {
            const service = new Service(thunkApi.dispatch, thunkApi.getState)
            const response = service.fetchProfile()
            return response
        }
        catch(err) {
            return thunkApi.rejectWithValue(err.response.data.message)
        }
    })

export const updateProfileAsyncThunk = createAsyncThunk<ProfileResponse, ProfileUpdateRequest, { state: RootState }>(
    "profile/updateProfile",
    async (request, thunkApi) => {
        try {
            const service = new Service(thunkApi.dispatch, thunkApi.getState)
            const response = service.updateProfile(request)
            return response
        } 
        catch (err) {
            return thunkApi.rejectWithValue(err.response.data.message)
        }
    }
)