import { makeAutoObservable } from "mobx";
import { Organization } from "../entities/organization";

export class OrganizationStore {
    organizations: Organization[] = [];
    organization?: Organization;

    constructor() {
        makeAutoObservable(this);
    }

    setOrganizaitons(organizations: Organization[]) {
        this.organizations = organizations;
    }

    setOrganization(organization: Organization) {
        this.organization = organization;
    }
}

export default new OrganizationStore();