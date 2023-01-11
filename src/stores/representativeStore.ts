import {makeAutoObservable} from "mobx";
import {Representative} from "../entities/representative";

export class RepresentativeStore {

    representatives: Representative[] = [];
    representative?: Representative;
    totalElements = 0;
    pageSize = 10;
    pageNumber = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    setRepresentatives(representatives: Representative[]) {
        this.representatives = representatives;
    }

}

export default new RepresentativeStore();