import { Organization } from "../entities/organization";
import { ART_SERVICE, axiosApi } from "../http/axios";

export class OrganizationApi {
    static getAllOrganizations() {
        return axiosApi.get<Array<Organization>>(`${ART_SERVICE}/organizations`);
    }
}