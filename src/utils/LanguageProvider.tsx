import React, { useEffect, useState } from 'react'
import { LanguageContext } from '../GlobalContext'
import { Language } from '../locales/Language'
import EncryptedStorage from 'react-native-encrypted-storage'
import en from '../locales/en'
import ro from '../locales/ro'
interface LanguageProviderProps {
    children: React.ReactNode
}
export default function LanguageProvider({children}: LanguageProviderProps) {
    let [language, setLanguage] = useState<Language>(en)
    useEffect(() => {
        EncryptedStorage.getItem("lang")
        .then(code => {
            console.log("Got language " + code)
            if(code) {
                setLanguage(getLanguageByCode(code))
            }
            else {
                setLanguage(en)
            }
            
        })
        .catch(_ => {
            setLanguage(en)
        })
    },[])
    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

export function getLanguageByCode(code: string): Language {
    switch(code) {
        case "en": return en;
        case "ro": return ro;
    }
    return en;
}