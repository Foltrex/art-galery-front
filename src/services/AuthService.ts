import {AuthApi} from "../api/AuthApi";
import {AccountType} from "../entities/enums/AccountType";
import Router from 'next/router'
import alertStore from "../stores/alertStore";
import {Cookies} from "react-cookie"

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

    static login(email: string, password: string) {
        AuthApi.login(email, password)
            .then(async response => {
                console.log(response.data.id)
                console.log(response.data.token)
                await Router.push("/")
            })
            .catch(async error => {
                console.log("Error to login: ", error)
                await alertStore.setShow(true, "error", "Login error", error.response.data.message)
            })
    }
}