import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Address } from '../../entities/address';
import { City } from '../../entities/city';
import { Facility } from '../../entities/facility';
import { Organization } from '../../entities/organization';
import { AddressService } from '../../services/AddressService';
import { CityService } from '../../services/CityService';
import { FacilityService } from '../../services/FacilityService';
import rootStore from '../../stores/rootStore';


interface IFacilityFormProps {
    open: boolean;
    handleClose: () => void;
    facility: Facility;
    organizations: Organization[];
    cities: City[]
}

const FacilityForm = observer(({open, handleClose, facility, organizations, cities } : IFacilityFormProps) => {
    const [facilityObj, setFacility] = useState(facility);

    const [addresses, setAddresses] = useState<Array<Address>>();

    const router = useRouter();

    useEffect(() => {
        setFacility(facility)
        if (!addresses || !addresses[0]) {
            setAddresses([facility?.address]);
        }

    }, [facility]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;
        if (name === 'activity') {
            setFacility({...facilityObj, isActive: checked });
        } else {
            setFacility({...facilityObj, [name]: value});
        }
    }


    const handleSelectChange = async (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        
        switch (name) {
            case 'organization': {
                const index = organizations
                    .map(organization => organization.id)
                    .indexOf(value);
                
                setFacility({...facilityObj, organization: organizations[index] });
                break;
            }
            case 'city': {
                await AddressService.getAllAddressesByCityId(value);
                const {addressStore} = rootStore;
                setAddresses(addressStore.getAddresses());
                router.push(router.asPath, undefined, { shallow: true })
                break;
            }
            case 'address': {
                const index = addresses!
                    .map(address => address.id)
                    .indexOf(value);
                
                // Parsing in order to get rid of proxy objects
                const address: Address = JSON.parse(JSON.stringify(addresses![index]));
                setFacility({...facilityObj, address: address});
                break;
            }
        }
        
    }

    const handleSaveButttonClick = async () => {
        await FacilityService.save(facilityObj);
        
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
            <Grid container rowSpacing={2}>
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
                    <Box sx={{display: 'flex', gap: '7px'}}>
                        <FormControl sx={{flexGrow: 1}} size='small'>
                            <InputLabel id='city-label'>City</InputLabel>
                            <Select 
                                labelId='city-label'
                                id='city'
                                name='city'
                                label='City'
                                defaultValue={facility?.address?.city?.id}
                                required
                                onChange={handleSelectChange}
                            >
                                {cities?.map(city => {
                                    return (
                                        <MenuItem id={city.id} value={city.id}>
                                            {city.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl sx={{flexGrow: 2}} size='small'>
                            <InputLabel id='address-label'>Address</InputLabel>
                            <Select 
                                labelId='address-label'
                                id='address'
                                name='address'
                                label='Address'
                                defaultValue={facility?.address?.id}
                                required
                                onChange={handleSelectChange}
                            >
                                {addresses && addresses[0] && addresses.map(address => {
                                    return (
                                        <MenuItem id={address.id} value={address.id}>
                                            {address.streetName}, {address.streetNumber}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant='standard'>
                        <InputLabel id="organization-label">Organization</InputLabel>
                        <Select
                            labelId="organization-label"
                            id='organization'
                            name='organization'
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
