import { OrganizationApi } from "../api/OrganizationApi";
import organizationStore from "../stores/organizationStore";

export class OrganizationService {
    static async getAllOrganizations() {
        await OrganizationApi.getAllOrganizations()
            .then(response => {
                console.log(response.data);
                organizationStore.setOrganizaitons(response.data.organizations)
            })
            .catch(error => console.log(error));
    }
}