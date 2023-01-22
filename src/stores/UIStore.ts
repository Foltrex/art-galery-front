class UIStore {
    isShow: boolean = true;

    constructor(initialData = {}) {
        // @ts-ignore
        this.isShow = initialData.isShow
    }

    setIsShow(isShow: boolean) {
        console.log("AAAAAA")
        this.isShow = isShow;
    }


    __data() {
        return {
            isShow: this.isShow
        };
    }
}

export default UIStore;
