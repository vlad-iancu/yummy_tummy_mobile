export type Restaurant = {
    id: number,
    locationId: number,
    name: string,
    photoUrl: string,
    thumbnailUrl: string,
}
export interface RestaurantsPayload {
    restaurants: Array<Restaurant>,
    query?: string,
    page: number
    error?: any,
    endReached: boolean
}
export type RestaurantPage = {
    page: number,
    restaurants: Array<Restaurant>
}
export interface RestaurantState {
    pagesLoaded: number,
    restaurants: Array<RestaurantPage>
    query?: string,
    error?: any,
    endReached: boolean,
    nextPage: number
}

export type RestaurantPageArgs = {
    token: string,
    q?: string | null,
    pageSize: number
}