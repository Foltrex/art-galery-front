
import React from "react";
import { createContext, ReactNode } from "react";
import { Organization } from "../entities/organization";
import { AddressStore } from "./addressStore";
import { CityStore } from "./cityStore";
import { FacilityStore } from "./facilityStore";
import { OrganizationStore } from "./organizationStore";
import { RepresentativeStore } from "./representativeStore";


export class RootStore {
    facilityStore: FacilityStore;
    representativeStore: RepresentativeStore;
    organizationStore: OrganizationStore;
    cityStore: CityStore;
    addressStore: AddressStore;

    constructor() {
        this.facilityStore = new FacilityStore(this);
        this.representativeStore = new RepresentativeStore(this);
        this.organizationStore = new OrganizationStore(this);
        this.cityStore = new CityStore(this);
        this.addressStore = new AddressStore(this);
    }
}

const rootStore = new RootStore();
export default rootStore;