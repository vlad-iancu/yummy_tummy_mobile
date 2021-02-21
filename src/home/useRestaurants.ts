import { useEffect, useState } from 'react'
import axios from 'axios'
import EncryptedStorage from 'react-native-encrypted-storage'
import { Restaurant } from './restaurantsReducer'
import useAuthToken from '../utils/useAuthToken'
export default function useRestaurants(): [restaurants: Array<Restaurant>, error: string, loading: boolean] {
    let [loading, setLoading] = useState<boolean>(false)
    let [restaurants, setRestaurants] = useState<Array<Restaurant>>([])
    let [error, setError] = useState<string>("")
    let [token, authError] = useAuthToken()
    useEffect(() => {
        if(authError) {
            setError(authError)
        }
    }, [authError])
    useEffect(() => {
        if (token) {
            setLoading(true)
            axios.get("/restaurants", { headers: { Authorization: `Bearer ${token}` } })
                .then(result => {
                    if (result.status == 200) {
                        setRestaurants(result.data.restaurants)
                    }
                    else {
                        setError(result.data.message)
                    }
                })
                .catch(err => {
                    setError(err)
                    setLoading(false)
                })
        }

    }, [token])

    return [restaurants, error, loading]
}