import {axiosApi} from "../http/axios";
import {ART_SERVICE} from "../http/axios";
import {Representative} from "../entities/representative";

export class RepresentativeApi {

    static getAllRepresentative(page?: number, size?: number) {
        return axiosApi.get<Representative[]>(`${ART_SERVICE}/representatives`, {
            params: {
                page: page,
                size: size,
            }
        })
    }

    static getAllRepresentativeByOrganizationId(organizationId: string, page?: number, size?: number) {
        return axiosApi.get<any>(`${ART_SERVICE}/representatives/organizations/${organizationId}`, {
            params: {
                page: page,
                size: size,
            }
        }).then(response => response.data)
    }

}