import {RepresentativeApi} from "../api/RepresentativeApi";
import representativeContainer from "../stores/representativeStore";

export class RepresentativeService {

    static async getAllRepresentative(page: number, size: number) {
        try {
            await RepresentativeApi.getAllRepresentative(page, size)
                .then(response => {
                    // console.log(response.data)
                    representativeContainer.setPageNumber(response.data.pageable.pageNumber)
                    representativeContainer.setPageSize(response.data.pageable.pageSize)
                    representativeContainer.setTotalElements(response.data.totalElements)
                    representativeContainer.setRepresentatives(response.data.content);
                })
        } catch (error) {
            console.log(error)
        }
    }
}

