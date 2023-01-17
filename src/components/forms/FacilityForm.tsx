import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Divider } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Facility } from '../../entities/facility';


const useStyles = makeStyles({
    input: {
        '&:invalid': {
            // border: '1px solid red'
            borderBottom: '2px solid red'
        }
    }
})

interface FacilityFormProps {
    open: boolean
    handleClose: () => void
    facility?: Facility
}

const FacilityForm = ({open, handleClose, facility } : FacilityFormProps) => {
    const classes = useStyles();
    
    let address: String = '';
    if (facility && facility.address) {
        const { city, streetName, streetNumber } = facility.address;
        address = [city.name, streetName, streetNumber].join(', ');
    }

    let organizaiton: String = '';
    if (facility && facility.organization) {
        organizaiton = facility.organization.name;
    }

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
                        defaultValue={facility && facility.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label='Activity'
                        fullWidth
                        variant='standard'
                        type='name'
                        required
                        defaultValue={facility && facility.isActive ? 'Active' : 'Inactive'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id='address'
                        label='Address'
                        fullWidth
                        variant='standard'
                        type='text'
                        inputProps={{ className: classes.input, pattern: /[A-Za-zА-Яа-я\s\.\-]+,\s*[A-Za-zА-Яа-я\s\.\-]+,\s*\w+/ }}
                        placeholder='City, Street Name, Street Number'
                        required
                        defaultValue={address}
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
                        defaultValue={organizaiton}
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

export default FacilityForm;