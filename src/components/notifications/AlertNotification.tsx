import React from "react";
import {Alert, AlertColor, AlertTitle, Collapse} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import alertStore from "../../stores/alertStore";
import {observer} from "mobx-react-lite";

interface IRepresentativeTableItemProps {
    severity?: AlertColor,
    title?: string,
    text?: string,
}

const AlertNotification: React.FC<IRepresentativeTableItemProps> = observer((props) => {
    return (
        <div>
            <Collapse in={alertStore.show}>
                <Alert
                    severity={props.severity || alertStore.severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                alertStore.setShow(false)
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    sx={{mb: 2}}
                >
                    <AlertTitle>{props.title || alertStore.title}</AlertTitle>
                    {props.text || alertStore.text}
                </Alert>
            </Collapse>
        </div>
    )
})

export default AlertNotification