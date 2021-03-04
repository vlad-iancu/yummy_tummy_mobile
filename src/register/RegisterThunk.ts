import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterRequest } from "../service/Request";
import { RegisterResponse } from "../service/Response";
import { RootState } from "../Store";
import Service from '../service/AuthService'
import { UiActions } from "../UISlice";

const registerThunk = createAsyncThunk<RegisterResponse, RegisterRequest, { state: RootState }>("auth/register", async (request, thunkApi) => {
    try {
        let service = new Service(thunkApi.dispatch, thunkApi.getState)
        let response = await service.register(request)
        thunkApi.dispatch(UiActions.message(thunkApi.getState().ui.language.registrationSuccessful))
        return response
    }catch(err) {
        return thunkApi.rejectWithValue(err.response.data.message)
    }
        
})

export { registerThunk }