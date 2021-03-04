import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAsyncThunk, logoutAsyncThunk } from "./AuthThunks";

interface AuthState {
    token: string,
    error?: string
}
const initialState: AuthState = { token: "" }
const authSilce = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            token: {
                reducer: (state, action: PayloadAction<string>) => { state.token = action.payload },
                prepare: (token: string) => {
                    return { payload: token }
                }
            }
        },
        extraReducers: builder => {
            builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
                state.token = action.payload
                state.error = undefined
            })
            builder.addCase(loginAsyncThunk.rejected, (state, action) => {
                state.error = action.error.message
            })
            builder.addCase(logoutAsyncThunk.fulfilled, (state, _) => {
                state.token = ""
            })
        }
    }
)
const tokenAction = authSilce.actions.token
export default authSilce.reducer
export { tokenAction }