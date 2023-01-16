import {AccountApi} from "../api/AccountApi";
import {AccountType} from "../entities/enums/AccountType";
import Router from 'next/router'

export class AccountService {

    static register(email: string, password: string, accountType: AccountType) {
        AccountApi.register(email, password, accountType)
            .then(response => {
                console.log(response.data.id)
                console.log(response.data.token)
            })
            .catch(error => {
                console.log("Error to register: ", error.response.data)
            })
    }

    static registerRepresentative(email: string, password: string) {
        AccountApi.register(email, password, AccountType.REPRESENTATIVE)
            .then(response => {
            })
            .catch(error => {
                console.log("Error to register: ", error.response.data)
            })
    }

    static login(email: string, password: string) {
        AccountApi.login(email, password)
            .then(async response => {
                console.log(response.data.id)
                console.log(response.data.token)
                await Router.push("/")
            })
            .catch(error => {
                console.log("Error to login: ", error)
            })
    }
}