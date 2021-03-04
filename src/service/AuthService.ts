import axios from "axios";
import { LoginRequest, RegisterRequest } from "./Request";
import { LoginResponse, RegisterResponse } from "./Response";
import Service from "./Service";

class AuthService extends Service {

    async login(requestBody: LoginRequest): Promise<LoginResponse> {
        return this.executeRequest(async () => {
            let response: LoginResponse = (await axios.post("/login", requestBody)).data
            return response
        })
    }
    async register(requestBody: RegisterRequest): Promise<RegisterResponse> {
        return this.executeRequest(async () => {
            let response = (await axios.post("/register", requestBody)).data
            return response
        })
    }
}

export default AuthService