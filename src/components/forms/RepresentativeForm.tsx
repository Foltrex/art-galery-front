import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { Representative } from '../../entities/representative';

interface IRepresentativeFormProps {
    open: boolean;
    handleClose: () => void;
    representative?: Representative
}

const RepresentativeForm = ({open, handleClose, representative } : IRepresentativeFormProps) => {
    const [representativeObj, setRepresentative] = useState({});

    useEffect(() => {
        if (representative) {
            const { organization, facility } = representative;
        }

        setRepresentative({...representative})
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRepresentative({...representativeObj, [name]: value})
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        console.log(e.target);
        
        const { value } = e.target;
    }


    const handleSaveButtonClick = () => {
        console.log(representativeObj);
    }


    return (
      <Dialog open={open} onClose={handleClose} maxWidth='xs'>
        <DialogTitle>{representative ? 'Edit' : 'Create'} Representative</DialogTitle>
        <Divider />
        <DialogContent>
            <Grid container rowSpacing='3'>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        id="firstname"
                        name='firstname'
                        label="Firstname"
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
                        fullWidth
                        defaultValue={representative?.lastname}
                        variant='standard'
                        type='name'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <FormControl fullWidth variant='standard'>
                        <InputLabel id="facility-label">Facility</InputLabel>
                        <Select
                            labelId="facility-label"
                            id='facility'
                            name='facility'
                            label='Facility'
                            required
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={10}>First</MenuItem>
                            <MenuItem value={20}>Second</MenuItem>
                            <MenuItem value={30}>Third</MenuItem>
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
                            // value={age}
                            label="Organization Role"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={10}>Admin</MenuItem>
                            <MenuItem value={20}>NeAdmin</MenuItem>
                            <MenuItem value={30}>Maybe admin</MenuItem>
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