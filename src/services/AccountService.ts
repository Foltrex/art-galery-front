import {AuthApi} from "../api/AuthApi";
import {AccountEnum} from "../entities/enums/AccountEnum";

export class AccountService {

    static registerRepresentative(email: string, password: string) {
        AuthApi.register(email, password, AccountEnum.REPRESENTATIVE)
            .then(response => {
            })
            .catch(error => {
                console.log("Error to register: ", error.response.data)
            })
    }

}
