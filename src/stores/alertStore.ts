import {makeAutoObservable} from "mobx";
import {AlertColor} from "@mui/material";

class AlertStore {

    show: boolean = false;
    severity?: AlertColor = "success";
    title?: string = '';
    text?: string = ''

    constructor() {
        makeAutoObservable(this);
    }

    reset() {
        this.show = false;
        this.severity = "success";
        this.title = '';
        this.text = ''
    }

    setShow(show: boolean, severity? : AlertColor, title? : string, text? : string) {
        this.show = show;
        this.severity = severity || this.severity;
        this.title = title || this.title;
        this.text = text || this.text;
    }

    setSeverity(severity : AlertColor) {
        this.severity = severity;
    }

    setTitle(title : string) {
        this.title = title;
    }

    setText(text : string) {
        this.text = text;
    }

}

export default new AlertStore();