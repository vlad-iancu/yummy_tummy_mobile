import React, { useEffect, useState } from 'react'
import { LanguageContext } from '../GlobalContext'
import { Language } from '../locales/Language'
import EncryptedStorage from 'react-native-encrypted-storage'
import en from '../locales/en'
import ro from '../locales/ro'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { UiActions } from '../UISlice'

export default function useLanguageSetup() {
    let language = useSelector<RootState, Language>(state => state.ui.language)
    let dispatch = useDispatch()
    useEffect(() => {
        EncryptedStorage.getItem("lang")
        .then(code => {
            if(code) {
                dispatch(UiActions.language(getLanguageByCode(code)))
            }
            else {
                dispatch(UiActions.language(en))
            }
            
        })
        .catch(_ => {
            dispatch(UiActions.language(en))
        })
    },[])
}

export function getLanguageByCode(code: string): Language {
    switch(code) {
        case "en": return en;
        case "ro": return ro;
    }
    return en;
}