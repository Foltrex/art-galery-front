import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { OrganizationRoleEnum } from '../../entities/enums/organizationRoleEnum';
import { Facility } from '../../entities/facility';
import { Representative } from '../../entities/representative';

interface IRepresentativeFormProps {
    open: boolean;
    handleClose: () => void;
    representative: Representative;
    facilities: Facility[];
}

const RepresentativeForm = ({open, handleClose, representative, facilities } : IRepresentativeFormProps) => {
    
    const [representativeObj, setRepresentative] = useState({});

    useEffect(() => setRepresentative({...representative}), [representative])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRepresentative({...representativeObj, [name]: value})
    }


    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'facility': {
                const index = facilities
                    .map(facility => facility.id)
                    .indexOf(value);
                
                setRepresentative({...representativeObj, facility: facilities[index]})
                break;
            }
            case 'organizationRole': {
                const index = Object
                    .values(OrganizationRoleEnum)
                    .indexOf(value as OrganizationRoleEnum);

                setRepresentative({
                    ...representativeObj, 
                    organizationRole: Object.keys(OrganizationRoleEnum)[index]})
                break;
            }
        }
    }


    const handleSaveButtonClick = () => {
        console.log(representativeObj);
    }


    return (
      <Dialog open={open} onClose={handleClose} maxWidth='xs'>
        <DialogTitle>
            {representative && Object.keys(representative).length !== 0 ? 'Edit' : 'Create'} Representative
        </DialogTitle>
        <Divider />
        <DialogContent>
            <Grid container rowSpacing='3'>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        id="firstname"
                        name='firstname'
                        label="Firstname"
                        onChange={handleChange}
                        type="name"
                        fullWidth
                        required
                        defaultValue={representative?.firstname}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id='lastname'
                        name='lastname'
                        label='Lastname'
                        onChange={handleChange}
                        fullWidth
                        defaultValue={representative?.lastname}
                        variant='standard'
                        type='name'
                        required
                    />
                </Grid>
                {representative && Object.keys(representative).length !== 0 
                    && <Grid item xs={12}>
                            <TextField 
                                id='organization'
                                name='organization'
                                label='Organization'
                                disabled
                                fullWidth
                                variant='standard'
                                type='name'
                                defaultValue={representative?.organization?.name }
                                required
                            />
                        </Grid>
                }
                <Grid item xs={12}>
                    <FormControl fullWidth variant='standard'>
                        <InputLabel id="facility-label">Facility</InputLabel>
                        <Select
                            labelId="facility-label"
                            id='facility'
                            name='facility'
                            label='Facility'
                            defaultValue={representative?.facility?.id}
                            required
                            onChange={handleSelectChange}
                        >
                            {facilities?.map(facility => {
                                return (
                                    <MenuItem value={facility.id} id={facility.id}>
                                        {facility.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant='standard'>
                        <InputLabel id="organization-role-label">Organization Role</InputLabel>
                        <Select
                            labelId="organization-role-label"
                            id="organizationRole"
                            name='organizationRole'
                            defaultValue={representative?.organizationRole?.name}
                            label="Organization Role"
                            onChange={handleSelectChange}
                        >
                            {Object.values(OrganizationRoleEnum).map(organizationRole => {
                                return (
                                    <MenuItem value={organizationRole}>
                                        {organizationRole}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='text'>Cancel</Button>
          <Button onClick={handleSaveButtonClick} variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    );
};

export default RepresentativeForm;