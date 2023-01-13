import {makeAutoObservable} from "mobx";
import { Facility } from "../entities/facility";

class FacilityStore {

    facilities: Facility[] = [];
    facility?: Facility;
    totalElements = 0;
    pageSize = 10;
    pageNumber = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setFacilities(facilities: Facility[]) {
        this.facilities = facilities;
    }

    setFacility(facility: Facility) {
        this.facility = facility;
    }

    setTotalElements(totalElements: number) {
        this.totalElements = totalElements;
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
    }
}

export default new FacilityStore();