import { ART_SERVICE, axiosApi } from "../http/axios";

export class OrganizationApi {
    static getAllOrganizations() {
        return axiosApi.get(`${ART_SERVICE}/organizations`);
    }
}