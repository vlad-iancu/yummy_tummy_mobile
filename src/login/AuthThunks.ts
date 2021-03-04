import { createAsyncThunk } from "@reduxjs/toolkit";
import EncryptedStorage from "react-native-encrypted-storage";
import { LoginRequest } from "../service/Request";
import Service from "../service/AuthService";
import { RootState } from "../Store";

const loginAsyncThunk = createAsyncThunk<string, LoginRequest, { state: RootState }>("auth/login", async (request, thunkApi) => {
    try {
        let service = new Service(thunkApi.dispatch, thunkApi.getState)
        let response = await service.login(request)
        console.log("LoginThunk:" + JSON.stringify(response))
        await EncryptedStorage.setItem("authToken", response.token)
        return response.token
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response.data.message)
    }
})
const logoutAsyncThunk = createAsyncThunk("auth/logout", async (_, thunkApi) => {
    return EncryptedStorage.removeItem("authToken")
})

export { loginAsyncThunk, logoutAsyncThunk }