import { Restaurant } from "../home/RestaurantTypes"

export type LoginResponse = {
    token: string
}
export type RegisterResponse = {
    id: number,
    email?: string,
    phone?: string,
    name: string
}
export type ProfileResponse = {
    id: number,
    name: string,
    phone?: string
    email?: string,
    photoUrl?: string,
}
export type RestaurantResponse = {
    restaurants: Array<Restaurant>
}