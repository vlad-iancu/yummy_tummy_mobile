import { useCallback, useEffect, useState } from 'react'
import EncryptedStorage from 'react-native-encrypted-storage'
import axios from 'axios'
import useAuthToken from '../utils/useAuthToken'

interface UserProfile {
    name: string,
    phone: string,
    email: string,
    photoUrl: string
}
export default function useProfile():
    [profile: UserProfile | undefined, loading: boolean, refresh: () => void, error: string] {
    let [profile, setProfile] = useState<UserProfile>()
    let [loading, setLoading] = useState(false)
    let [token, authError] = useAuthToken()
    let [error, setError] = useState("")
    let refresh = useCallback(() => {
        console.log("We entered refresh")
        if (token) {
            setLoading(true)
            setProfile(undefined)
            axios.get("/user", { headers: { Authorization: `Bearer ${token}` } })
                .then(result => {
                    result.request
                    setProfile(result.data)
                })
                .catch(err => {
                    console.log(err)
                    setError(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [token])
    useEffect(() => {
        if (authError) setError(authError)
    }, [authError])
    useEffect(() => {
        refresh()
    }, [refresh])

    return [profile, loading, refresh, error]
}
export type { UserProfile }