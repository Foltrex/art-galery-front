import jwt_decode from "jwt-decode";

export class TokenService {

    static decode(token: string) {
        const decoded = jwt_decode(token);
        console.log(decoded);

        return decoded;
    }
}