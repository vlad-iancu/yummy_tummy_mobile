import axios from "axios";
import { RestaurantsRequest } from "./Request";
import { RestaurantResponse } from "./Response";
import Service from "./Service";


export default class RestaurantService extends Service {

    async fetchRestaurants(request: RestaurantsRequest): Promise<RestaurantResponse> {
        return this.executeRequest(async () => {
            let token = this.getState().auth.token
            return (await axios.get("/restaurants", { params: request, headers: { Authorization: `Bearer ${token}` } })).data
        })
    }
}