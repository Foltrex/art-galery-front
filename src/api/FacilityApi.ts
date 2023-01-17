import { Facility } from "../entities/facility";
import { ART_SERVICE, axiosApi } from "../http/axios";

export class FacilityApi {
    static save(facility: Facility) {
        return axiosApi.post<any>(`${ART_SERVICE}/facilities`)
    }

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