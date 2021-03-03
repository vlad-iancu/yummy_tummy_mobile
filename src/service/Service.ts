import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../Store";
import { UiActions } from "../UISlice";
import { LoginRequest } from "./Request";
import { LoginResponse } from "./Response";

class Service {
    private dispatch: Dispatch<any>
    private getState: () => RootState
    constructor(_dispatch: Dispatch<any>, _getState: () => RootState) {
        this.dispatch = _dispatch
        this.getState = _getState
    }

    async executeRequest<Response>(block: () => Promise<Response>): Promise<Response> {
        this.dispatch(UiActions.loading(true))
        return block()
            .finally(() => {
                this.dispatch(UiActions.loading(false))
            })
    }

    async login(requestBody: LoginRequest): Promise<LoginResponse> {
        let v = this.executeRequest(async () => {
            let response: LoginResponse = (await axios.post("/login", requestBody)).data
            return response
        })
        return v
    }
}

export default Service