import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, Divider } from '@mui/material';
import { observer } from 'mobx-react';

interface IDeleteModal {
    open: boolean;
    handleClose: () => void;
    id: string;
    deleteById: (id: string) => Promise<void>;
}

const DeleteModal: React.FC<IDeleteModal> = observer(({open, handleClose, id, deleteById}) => {
    const handleDeleteClick = async () => {
        await deleteById(id)
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
                <Button onClick={handleDeleteClick} variant='contained'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
});

export default DeleteModal;
