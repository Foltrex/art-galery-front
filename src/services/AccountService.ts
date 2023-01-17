import {AuthApi} from "../api/AuthApi";
import {AccountType} from "../entities/enums/AccountType";

export class AccountService {

    static registerRepresentative(email: string, password: string) {
        AuthApi.register(email, password, AccountType.REPRESENTATIVE)
            .then(response => {
            })
            .catch(error => {
                console.log("Error to register: ", error.response.data)
            })
    }

}
