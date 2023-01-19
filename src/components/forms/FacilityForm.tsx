import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Divider, Switch, FormControlLabel, FormControl, Select, InputLabel, SelectChangeEvent, MenuItem } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { createContext, useEffect, useState } from 'react';
import { Facility } from '../../entities/facility';
import { FacilityService } from '../../services/FacilityService';
import { observer } from 'mobx-react';
import { GetServerSideProps } from 'next';
// import organizationStore from '../../stores/organizationStore';
import { OrganizationService } from '../../services/OrganizationService';
import { Organization } from '../../entities/organization';
import styled from '@emotion/styled';


const StyledTextField = styled.div`
    &:hover {
        background-color: black
    }
`;

// const useStyles = makeStyles({
//     input: {
//         '&:invalid': {
//             borderBottom: '2px solid red'
//         }
//     }
// })


interface IFacilityFormProps {
    open: boolean;
    handleClose: () => void;
    facility: Facility;
    organizations: Organization[];
}

const FacilityForm = observer(({open, handleClose, facility, organizations } : IFacilityFormProps) => {
    // const classes = useStyles();
    const [facilityObj, setFacility] = useState(facility);

    useEffect(() => setFacility(facility), [facility]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;
        if (name === 'activity') {
            setFacility({...facilityObj, isActive: checked })
        } else {
            setFacility({...facilityObj, [name]: value});
        }
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        console.log(e.target.value);
        
    }

    const handleSaveButttonClick = () => {
        console.log(facilityObj)
        handleClose();
    }
    
    let address: String = '';
    if (facility && facility.address) {
        const { city, streetName, streetNumber } = facility.address;
        address = [city?.name, streetName, streetNumber].join(', ');
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
                        defaultValue={facility?.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel 
                        control={
                            <Switch 
                                name='activity'
                                onChange={handleChange} 
                                defaultChecked={facility?.isActive} />
                        } 
                        label="Active"
                        sx={{ mt: 1 }} />
                </Grid>
                <Grid item xs={12}>
                    <StyledTextField>
                        <TextField 
                            id='address'
                            label='Address'
                            name='address'
                            onChange={handleChange}
                            fullWidth
                            variant='standard'
                            type='text'
                            // inputProps={{ className: classes.input, pattern: /[A-Za-zА-Яа-я\s\.\-]+,\s*[A-Za-zА-Яа-я\s\.\-]+,\s*\w+/ }}
                            placeholder='City, Street Name, Street Number'
                            required
                            defaultValue={address}
                        />
                    </StyledTextField>
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
                        defaultValue={facility?.organization?.name}
                    />
                    <FormControl fullWidth variant='standard'>
                        <InputLabel id="organizaiton-label">Facility</InputLabel>
                        <Select
                            labelId="organizaiton-label"
                            id='organizaiton'
                            name='organizaiton'
                            label='Organization'
                            defaultValue={facility?.organization?.id}
                            required
                            onChange={handleSelectChange}
                        >
                            {organizations?.map(organization => {
                                return (
                                <MenuItem value={organization.id} id={organization.id}>
                                    {organization.name}
                                </MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='text'>Cancel</Button>
          <Button onClick={handleSaveButttonClick} variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    );
});

export default FacilityForm;