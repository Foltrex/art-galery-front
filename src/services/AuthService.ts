import {AuthApi} from "../api/AuthApi";
import {AccountType} from "../entities/enums/AccountType";
import Router from 'next/router'
import alertStore from "../stores/alertStore";
import {TokenService} from "./TokenService";

export class AuthService {

    static register(email: string, password: string, accountType: AccountType) {
        AuthApi.register(email, password, accountType)
            .then(async response => {
                await Router.push("/")
                console.log(response.data.id)
                console.log(response.data.token)
            })
            .catch(async error => {
                console.log("Error to register: ", error.response.data)
                await alertStore.setShow(true, "error", "Register error", error.response.data.message)
            })
    }

    static async login(email: string, password: string) {
        await AuthApi.login(email, password)
            .then(response => {
                console.log(response.data.id)
                console.log(response.data.token)
                console.log(TokenService.decode(response.data.token))
                Router.push("/")
            })
            .catch(error => {
                console.log("Error to login: ", error)
                alertStore.setShow(true, "error", "Login error", error.response.data.message)
            })
    }
}