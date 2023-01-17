import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, Divider } from '@mui/material';
import * as React from 'react';

interface IDeleteFacilityModal {
    open: boolean
    handleClose: () => void
}

const DeleteFacilityModal: React.FC<IDeleteFacilityModal> = ({open, handleClose}) => {

    const handleDeleteFacilityClick = () => {
        // send delete request
        handleClose();
    }
    
    return (
        <Dialog open={open}>
            <DialogTitle>
                Are you sure?
            </DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText>
                    Do you really want to delete this record? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDeleteFacilityClick} variant='contained'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteFacilityModal;
