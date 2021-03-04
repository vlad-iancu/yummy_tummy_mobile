import axios from "axios";
import { ProfileUpdateRequest } from "./Request";
import { ProfileResponse } from "./Response";
import Service from "./Service";



export default class ProfileService extends Service {

    async fetchProfile(): Promise<ProfileResponse> {
        return this.executeRequest(async () => {
            let token = this.getState().auth.token
            return (await axios.get("/user", { headers: { Authorization: `Bearer ${token}` } })).data
        })
    }
    async updateProfile(request: ProfileUpdateRequest): Promise<ProfileResponse> {
        return this.executeRequest(async () => {
            let { password, email, newName, newPhoto, phone } = request
            let body = new FormData()
            body.append("password", password)
            body.append("email", email)
            body.append("phone", phone)
            if (newName)
                body.append("name", newName)
            if (newPhoto)
                body.append("profilePicture", {
                    uri: newPhoto?.uri,
                    name: newPhoto?.fileName,
                    type: newPhoto?.type,
                })
            let newProfile = (await axios.put("/user_profile", body)).data
            return newProfile
        })
    }
}