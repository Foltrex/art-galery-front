import {FacilityApi} from "../api/FacilityApi";
import { Facility } from "../entities/facility";
import facilityStore from "../stores/facilityStore"


export class FacilityService {

    static async getAllFacilities(page: number, size: number) {
        await FacilityApi.getAllFacilities(page, size)
            .then(response => {
                console.log(response.data)
                facilityStore.setPageNumber(response.data.pageable.pageNumber);
                facilityStore.setPageSize(response.data.pageable.pageSize);
                facilityStore.setTotalElements(response.data.totalElements);
                facilityStore.setFacilities(response.data.content);
            })
            .catch(error => console.log(error))
    }

    static async save(facility: Facility) {
        await FacilityApi.save(facility)
            .then(response => {

            })
            .catch(error => console.log(error));
    }

    static async deleteById(id: string) {
        await FacilityApi.deleteById(id)
            .then(() => facilityStore.deleteById(id))
            .catch(error => console.log(error));
    }
}