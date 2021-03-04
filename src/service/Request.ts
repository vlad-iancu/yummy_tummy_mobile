import { ImagePickerResponse } from "react-native-image-picker"

export type LoginRequest = {
    email?: string,
    phone?: string,
    password: string
}
export type RegisterRequest = {
    email?: string,
    name: string,
    password: string,
    phone?: string
}
export type ProfileUpdateRequest = {
    password: string,
    email?: string,
    phone?: string,
    newName?: string,
    newPhoto?: ImagePickerResponse
}
export type RestaurantsRequest = {
    q: string,
    page: number,
    pageSize: number

}