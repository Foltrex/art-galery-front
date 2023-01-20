import {AuthApi} from "../api/AuthApi";
import {AccountEnum} from "../entities/enums/AccountEnum";
import Router from 'next/router'
import alertStore from "../stores/alertStore";
import {TokenService} from "./TokenService";
import {Cookies} from "react-cookie"

const cookies = new Cookies()

export class AuthService {

    static async register(email: string, password: string, accountType: AccountEnum) {
        await AuthApi.register(email, password, accountType)
            .then(response => {
                this.handleAuthorization(response.data.token)
            })
            .catch(async error => {
                console.log("Error to register: ", error.response.data)
                await alertStore.setShow(true, "error", "Register error", error.response.data.message)
            })
    }

    static async login(email: string, password: string) {
        await AuthApi.login(email, password)
            .then(response => {
                this.handleAuthorization(response.data.token)
            })
            .catch(error => {
                console.log("Error to login: ", error)
                alertStore.setShow(true, "error", "Login error", error.response.data.message)
            })
    }

    private static async handleAuthorization(token: string) {
        const decoded = TokenService.decode(token)
        cookies.set("token", token, {
            path: "/",
            sameSite: "strict",
            maxAge: decoded.exp - decoded.iat,
        })
        await Router.push("/")
    }

    static isAuthenticated(): boolean {
        return cookies.get("token") !== undefined;
    }

    static async logout() {
        cookies.remove("token", {path: "/"})
        await Router.push("/security/signin")
    }

}