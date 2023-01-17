import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React from 'react';

interface RepresentativeFormProps {
    open: boolean
    handleClose: () => void
}

const RepresentativeForm = ({open, handleClose} : RepresentativeFormProps) => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth='xs'>
        <DialogTitle>Create Representative</DialogTitle>
        <Divider />
        <DialogContent>
            <Grid container rowSpacing='3'>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        id="email"
                        label="Email"
                        type="name"
                        fullWidth
                        required
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id='role'
                        label='Role'
                        fullWidth
                        variant='standard'
                        type='name'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id='facility'
                        label='Facility'
                        fullWidth
                        variant='standard'
                        type='name'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id='action'
                        label='Action'
                        fullWidth
                        variant='standard'
                        type='name'
                        required
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='text'>Cancel</Button>
          <Button onClick={handleClose} variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    );
};

export default RepresentativeForm;