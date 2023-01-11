import {RepresentativeApi} from "../api/RepresentativeApi";
import representativeContainer from "../stores/representativeStore";

export class RepresentativeService {

    static getAllRepresentative() {
        try {
            RepresentativeApi.getAllRepresentative()
                .then(response => {
                    console.log(response)
                    representativeContainer.setRepresentatives(response.data);
                })
        } catch (error) {
            console.log(error)
        }
    }
}

