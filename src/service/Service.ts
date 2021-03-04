import { Dispatch } from "redux"
import { RootState } from "../Store"
import { UiActions } from "../UISlice"

export default class Service {
    protected dispatch: Dispatch<any>
    protected getState: () => RootState
    constructor(_dispatch: Dispatch<any>, _getState: () => RootState) {
        this.dispatch = _dispatch
        this.getState = _getState
    }

    async executeRequest<Response>(block: () => Promise<Response>, loading: boolean = true): Promise<Response> {
        if (loading) this.dispatch(UiActions.loading(true))
        return block()
            .finally(() => {
                if (loading) this.dispatch(UiActions.loading(false))
            })
    }
}