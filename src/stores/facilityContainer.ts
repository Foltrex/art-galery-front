import {makeAutoObservable} from "mobx";

class FacilityContainer {

    facilities = [];
    facility = null;
    totalElements = 0;
    pageSize = 10;
    pageNumber = 0;
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
    }
}

export default new FacilityContainer();