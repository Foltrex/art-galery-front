
import React from "react";
import { createContext, ReactNode } from "react";
import { Organization } from "../entities/organization";
import { FacilityStore } from "./facilityStore";
import { OrganizationStore } from "./organizationStore";
import { RepresentativeStore } from "./representativeStore";


export class RootStore {
    facilityStore: FacilityStore;
    representativeStore: RepresentativeStore;
    organizationStore: OrganizationStore;

    constructor() {
        this.facilityStore = new FacilityStore(this);
        this.representativeStore = new RepresentativeStore(this);
        this.organizationStore = new OrganizationStore(this);
    }
}

const rootStore = new RootStore();
export default rootStore;