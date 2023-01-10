import {makeAutoObservable} from "mobx";

class RepresentativeContainer {

    representatives = [];
    representative = null;
    totalElements = 0;
    pageSize = 10;
    pageNumber = 0;
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increment() {
        this.count += 1;
    }

    decrement() {
        this.count -= 1;
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    fetchRepresentatives() {

    }

}

export default new RepresentativeContainer();