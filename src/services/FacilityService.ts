import {FacilityApi} from "../api/FacilityApi";
import facilityStore from "../stores/facilityStore"


export class FacilityService {

    static async getAllFacilities(page: number, size: number) {
        await FacilityApi.getAllFacilities(page, size)
            .then(response => {
                console.log(response)
                facilityStore.setPageNumber(response.data.pageable.pageNumber);
                facilityStore.setPageSize(response.data.pageable.pageSize);
                facilityStore.setTotalElements(response.data.totalElements);
                facilityStore.setFacilities(response.data.content);
            })
            .catch(error => {
                console.log(error);

            })
    }

    static async getFacilityById(id: number) {
        try {
          await FacilityApi.getFacilityById(id)
            .then(response => {
                console.log(response.data);
                
                // facilityStore.setFacility(response.data.facility)
            });
        } catch (error) {
            console.log(error);
        }
    }
}