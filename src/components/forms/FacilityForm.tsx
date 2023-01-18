import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Divider, Switch, FormControlLabel, FormControl } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { Facility } from '../../entities/facility';
import { FacilityService } from '../../services/FacilityService';


const useStyles = makeStyles({
    input: {
        '&:invalid': {
            // border: '1px solid red'
            borderBottom: '2px solid red'
        }
    }
})

interface IFacilityFormProps {
    open: boolean;
    handleClose: () => void;
    facility?: Facility;
}

const FacilityForm = ({open, handleClose, facility } : IFacilityFormProps) => {
    const classes = useStyles();
    const [facilityObj, setFacility] = useState({});

    useEffect(() => setFacility({...facility, isActive: false}), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;
        if (name === 'activity') {
            setFacility({...facilityObj, isActive: checked })
        } else {
            setFacility({...facilityObj, [name]: value});
        }
    }

    const handleSaveButttonClick = () => {
        console.log(facilityObj);
    }
    
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
        <DialogTitle>{facility ? 'Edit' : 'Create'} Facility</DialogTitle>
        <Divider />
        <DialogContent>
            <Grid container rowSpacing='3'>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        onChange={handleChange}
                        id="name"
                        name='name'
                        label="Name"
                        type="name"
                        fullWidth
                        required
                        variant="standard"
                        defaultValue={facility && facility.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel 
                        control={
                            <Switch 
                                name='activity'
                                onChange={handleChange} 
                                checked={facility && facility.isActive} />
                        } 
                        label="Active"
                        sx={{ mt: 1 }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id='address'
                        label='Address'
                        name='address'
                        onChange={handleChange}
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
                        onChange={handleChange}
                        name='organizaiton'
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
          <Button onClick={handleSaveButttonClick} variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    );
};

export default FacilityForm;