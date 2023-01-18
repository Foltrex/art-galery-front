import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, Divider } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Facility } from '../../entities/facility';
import { FacilityService } from '../../services/FacilityService';
import { RepresentativeService } from '../../services/RepresentativeService';

interface IDeleteFacilityModal {
    open: boolean;
    handleClose: () => void;
    facility: Facility;
}

const DeleteFacilityModal: React.FC<IDeleteFacilityModal> = observer(({open, handleClose, facility}) => {
    const handleDeleteFacilityClick = async () => {
        await FacilityService.deleteById(facility.id)
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
});

export default DeleteFacilityModal;
