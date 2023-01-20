import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Address } from '../../entities/address';
import { Facility } from '../../entities/facility';
import { Organization } from '../../entities/organization';


interface IFacilityFormProps {
    open: boolean;
    handleClose: () => void;
    facility: Facility;
    organizations: Organization[];
}

const FacilityForm = observer(({open, handleClose, facility, organizations } : IFacilityFormProps) => {
    const [facilityObj, setFacility] = useState(facility);

    useEffect(() => setFacility(facility), [facility]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;
        switch (name) {
            case 'activity': {
                setFacility({...facilityObj, isActive: checked })
                break;
            }
            case 'address': {
                const address: Address = parseAddressString(value);
            }
            default: {
                setFacility({...facilityObj, [name]: value});
                break;
            }
        }
    }

    const parseAddressString = (addressString: string): Address => {
        const {city} = facilityObj.address;
        const values: string[] = addressString.split(', ');
        const address: Address = {
            id: facilityObj?.id,
            city: null,
            streetName: values[1],
            streetNumber: +values[2]
        }

        return address;
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        if (name === 'organizaiton') {
            const index = organizations
                .map(organization => organization.id)
                .indexOf(value);

            setFacility({...facilityObj, organization: organizations[index] })
        }
        console.log(facilityObj);
        
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
        <DialogTitle>
            {facility && Object.keys(facility).length !== 0 ? 'Edit' : 'Create'} Facility
        </DialogTitle>
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
                    <TextField 
                        id='address'
                        label='Address'
                        name='address'
                        onChange={handleChange}
                        fullWidth
                        variant='standard'
                        type='text'
                        inputProps={{ pattern: /[A-Za-zА-Яа-я\s\.\-]+,\s*[A-Za-zА-Яа-я\s\.\-]+,\s*\w+/ }}
                        placeholder='City, Street Name, Street Number'
                        required
                        defaultValue={address}
                        sx={{
                            '& input:invalid': {
                                borderBottom: 2,
                                BorderColor: 'red'
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant='standard'>
                        <InputLabel id="organizaiton-label">Organization</InputLabel>
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
          <Button onClick={handleSaveButttonClick} variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    );
});

export default FacilityForm;
