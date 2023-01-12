import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React from 'react';
import styles from './FaiclityForm.module.css';

interface FacilityFormProps {
    open: boolean
    handleClose: () => void
}

const FacilityForm = ({open, handleClose} : FacilityFormProps) => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth='xs'>
        <DialogTitle>Create facility</DialogTitle>
        <Divider />
        <DialogContent>
            <Grid container rowSpacing='3'>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        required
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label='Activity'
                        fullWidth
                        variant='standard'
                        type='name'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id='address'
                        label='Address'
                        fullWidth
                        variant='standard'
                        type='name'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id='organizaiton'
                        label='Organization'
                        fullWidth
                        variant='standard'
                        type='name'
                        required
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='contained'>Cancel</Button>
          <Button onClick={handleClose} variant='contained'>Create</Button>
        </DialogActions>
      </Dialog>
    );
};

export default FacilityForm;