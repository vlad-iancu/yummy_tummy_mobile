import {ImagePickerResponse} from 'react-native-image-picker'

interface ProfileState {
    id: number,
    name?: string,
    email?: string,
    phone?: string,
    photoUrl?: string,
    error?: any,
    loaded: boolean,
}

type ProfileUpdatePayload = {
    name: string,
    email?: string,
    phone?: string,
    photoUrl?: string,
    error?: any
}
interface ProfileUpdate {
    newName?: string,
    newPhoto?: ImagePickerResponse,
    email?: string,
    phone?: string,
}
type ProfileUpdateArgs = ProfileUpdate & {password: string}

export type {ProfileState, ProfileUpdatePayload, ProfileUpdateArgs}