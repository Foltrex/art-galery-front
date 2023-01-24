import rootStore from "../stores/rootStore";


export class AlertService {

    static setAlertShow(show: boolean) {
        const { alertStore } = rootStore;
        alertStore.setShow(show)
    }
}