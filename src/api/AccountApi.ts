import {axiosApi, USER_SERVICE} from "../http/axios";
import {Representative} from "../entities/representative";

interface TAuthTokenDto {
    id: string,
    token: string,
}

export class AccountApi {

    static register(email: string, password: string, accountType: string) {
        return axiosApi.post<TAuthTokenDto>(`${USER_SERVICE}/accounts/register`, {
            email: email,
            password: password,
            accountType: accountType,
        })
    }

    static registerRepresentative(email: string, password: string, organizationId: string, facilityId: string) {
        return axiosApi.post<Representative>(`${USER_SERVICE}/accounts/register-representative`, {
            email: email,
            password: password,
            organizationId: organizationId,
            facilityId: facilityId,
        })
    }

    static login(email: string, password: string) {
        return axiosApi.post<TAuthTokenDto>(`${USER_SERVICE}/accounts/login`, {
            email: email,
            password: password
        })
    }

}