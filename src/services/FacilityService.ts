import { FacilityApi } from "../api/FacilityApi";
import facilityStore from "../stores/facilityStore"


export class FacilityService {

    static async getAllFacilities(page: number, size: number) {
        try {
            await FacilityApi.getAllFacilities(page, size)
                .then(response => {
                    facilityStore.setPageNumber(response.data.pageable.pageNumber);
                    facilityStore.setPageSize(response.data.pageable.pageSize);
                    facilityStore.setTotalElements(response.data.totalElements);
                    facilityStore.setFacilities(response.data.content);
                })
        } catch (error) {
            console.log(error);
        }
    }
}