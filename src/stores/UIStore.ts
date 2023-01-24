import {makeAutoObservable} from "mobx";

class UIStore {
    isShow: boolean;

    constructor(initialData = {}) {
        this.isShow = initialData.isShow
        makeAutoObservable(this)
    }

    setIsShow(isShow: boolean) {
        console.log("AAAAAA")
        console.log(this.isShow)
        this.isShow = !this.isShow;
    }

    __data() {
        console.log("DATA")
        return {
            isShow: this.isShow
        };
    }
}

export default UIStore;
