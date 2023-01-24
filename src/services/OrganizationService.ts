import {OrganizationApi} from "../api/OrganizationApi";
import rootStore from "../stores/rootStore";

export class OrganizationService {
    static async getAllOrganizations() {
        const {organizationStore} = rootStore;

        await OrganizationApi.getAllOrganizations()
            .then(response => {
                organizationStore.setOrganizaitons(response.data)
            })
            .catch(error => console.log(error));
    }

    static async getOrganizationByAccountId(accountId: string) {
        return OrganizationApi.getOrganizationByAccountId(accountId)
            .then(response => response.data)
            .catch(error => console.log(error))
    }

}