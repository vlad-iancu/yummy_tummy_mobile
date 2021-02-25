import React from 'react'
import en from './locales/en'
import ro from './locales/ro'
import { Language } from './locales/Language'
export const ProgressBarContext = React.createContext({ loading: false, setLoading: (loading: boolean) => { } })
export const LanguageContext =
    React.createContext<{ language: Language, setLanguage: (lang: Language) => void }>(
        {
            language: ro,
            setLanguage: (lang: Language) => { }
        }
    )