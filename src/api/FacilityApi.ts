import { ART_SERVICE, axiosApi } from "../http/axios";

export class FacilityApi {
    static getAllFacilities(page?: number, size?: number) {
        return axiosApi.get<any>(`${ART_SERVICE}/facilities`, {
            params: {
                page: page,
                size: size,
            }
        })
    }


}