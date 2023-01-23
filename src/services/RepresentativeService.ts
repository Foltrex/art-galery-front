import {RepresentativeApi} from "../api/RepresentativeApi";
import { Representative } from "../entities/representative";
import rootStore from "../stores/rootStore";

export class RepresentativeService {

    static async getAllRepresentative(page: number, size: number) {
        const { representativeStore } = rootStore; 

        await RepresentativeApi.getAllRepresentative(page, size)
            .then(response => {
                representativeStore.setPageNumber(response.data.pageable.pageNumber)
                representativeStore.setPageSize(response.data.pageable.pageSize)
                representativeStore.setTotalElements(response.data.totalElements)
                representativeStore.setRepresentatives(response.data.content);
            })
            .catch(error => {
                console.log(error)

            })
    }

    static async save(representative: Representative) {
        const { representativeStore } = rootStore;

        // TODO: change latter
        
        // await RepresentativeApi.save(representative)
        //     .then(response => representativeStore.addRepresentative(response.data))
        //     .catch(error => console.log(error));
    }

    static async deleteById(id: string) {
        const { representativeStore } = rootStore;

        await RepresentativeApi.deleteById(id)
            .then(() => representativeStore.deleteById(id))
            .catch(error => console.log(error))
    }
}

