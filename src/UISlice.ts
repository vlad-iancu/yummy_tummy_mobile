import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "./locales/Language";
import en from './locales/en'
type UiState = {
    loading: boolean,
    language: Language,
    error?: string
}
const initialState: UiState = { loading: false, language: en }

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
        }
    },
})

const actions = uiSlice.actions

export { actions as UiActions }
export default uiSlice.reducer
