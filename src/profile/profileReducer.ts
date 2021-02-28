import axios from 'axios'
import { ImagePickerResponse } from 'react-native-image-picker'
import { ProgressBarContext } from '../../App'
import { PROFILE_UPDATE } from '../Constants'
export interface Profile {
    name?: string,
    email?: string,
    phone?: string,
    photoUrl?: string,
    error?: any,
    loaded: boolean,
}
interface ProfileUpdate {
    newName?: string,
    newPhoto?: ImagePickerResponse,
    email?: string,
    phone?: string,
}
export default function profileReducer(state: Profile = { loaded: false }, action: { type: string, payload: Profile }): Profile {
    if (action.type === PROFILE_UPDATE) {
        return action.payload
    }
    return state
}

export const fetchProfileThunk = (
    token: string, setLoading: (loading: boolean) => void = () => { }) => async (dispatch: (action: any) => any, getState: unknown) => {
        try {
            setLoading(true)
            let profile = await axios.get("/user", { headers: { Authorization: `Bearer ${token}` } })
            setLoading(false)
            dispatch({ type: PROFILE_UPDATE, payload: { ...profile.data, loaded: true } })
        }
        catch (err) {
            dispatch({ type: PROFILE_UPDATE, payload: { error: err, loaded: true } })
        }

    }

export const updateProfileThunk = (
    password: string,
    { newName, newPhoto, email, phone }: ProfileUpdate,
    setLoading: (loading: boolean) => void = () => { }) => async (dispatch: (action: any) => any, _: () => unknown) => {
        try {
            console.log("Entered the update profile thunk")
            let body = new FormData()
            body.append("password", password)
            if (email)
                body.append("email", email)
            if (phone)
                body.append("phone", phone)
            if (newName)
                body.append("name", newName)
            if (newPhoto)
                body.append("profilePicture", {
                    uri: newPhoto?.uri,
                    name: newPhoto?.fileName,
                    type: newPhoto?.type,
                })
            setLoading(true)
            let newProfile = await axios.put("/user_profile", body)
            console.log("Profile request has code:" + newProfile.status)
            setLoading(false)
            dispatch({ type: PROFILE_UPDATE, payload: { ...newProfile.data, loaded: true } })

        }
        catch (err) {
            console.log("Entered thunk catch")
            dispatch({ type: PROFILE_UPDATE, payload: { error: err, loaded: true } })
        }
    }