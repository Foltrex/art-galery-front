import { ART_SERVICE, axiosApi } from "../http/axios";

export class FacilityApi {
    static getFacilityById(id: number) {
        return axiosApi.get<any>(`${ART_SERVICE}/facilities/${id}`)
    }
    static getAllFacilities(page?: number, size?: number) {
        return axiosApi.get<any>(`${ART_SERVICE}/facilities`, {
            params: {
                page: page,
                size: size,
            }
        })
    }


}