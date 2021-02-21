import { useEffect, useState } from 'react'
import EncryptedStorage from 'react-native-encrypted-storage'
export default function useAuthToken() {
    let [token, setToken] = useState("")
    let [error, setError] = useState("")
    useEffect(() => {
        EncryptedStorage.getItem("authToken")
        .then(result => {
            if(result) 
                setToken(result)
            else
                setError("Could not find any authentication token")
        })
        .catch(err => {
            setError(err)
        })
    },[])
    return [token, error]
}