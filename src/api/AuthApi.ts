import {axiosApi, USER_SERVICE} from "../http/axios";
import {Representative} from "../entities/representative";

interface TAuthTokenDto {
    id: string,
    token: string,
}

export class AuthApi {

    static register(email: string, password: string, accountType: string) {
        return axiosApi.post<TAuthTokenDto>(`${USER_SERVICE}/auth/register`, {
            email: email,
            password: password,
            accountType: accountType,
        })
    }

    static login(email: string, password: string) {
        return axiosApi.post<TAuthTokenDto>(`${USER_SERVICE}/auth/login`, {
            email: email,
            password: password
        })
    }

}