import {FacilityApi} from "../api/FacilityApi";
import { Facility } from "../entities/facility";
import rootStore from "../stores/rootStore";


export class FacilityService {
    
    static async getAllFacilities() {
        const { facilityStore } = rootStore;

        await FacilityApi.getAllFacilities()
            .then(response => facilityStore.setFacilities(response.data))
            .catch(error => console.log(error));
    }

    static async getAllFacilitiesPage(page: number, size: number) {
        const { facilityStore } = rootStore;

        await FacilityApi.getAllFacilitiesPage(page, size)
            .then(response => {
                facilityStore.setPageNumber(response.data.pageable.pageNumber);
                facilityStore.setPageSize(response.data.pageable.pageSize);
                facilityStore.setTotalElements(response.data.totalElements);
                facilityStore.setFacilities(response.data.content);
            })
            .catch(error => console.log(error))
    }

    static async save(facility: Facility) {
        const { facilityStore } = rootStore;

        // TODO: change latter

        // await FacilityApi.save(facility)
        //     .then(response => facilityStore.addFacility(response.data))
        //     .catch(error => console.log(error));
    }

    static async deleteById(id: string) {
        const { facilityStore } = rootStore;

        await FacilityApi.deleteById(id)
            .then(() => facilityStore.deleteById(id))
            .catch(error => console.log(error));
    }
}