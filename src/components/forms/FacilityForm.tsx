import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React from 'react';
import styles from './FaiclityForm.module.css';

const FacilityForm = () => {
    return (
        <Paper>
            <h2>Facility Form</h2>
            <TextField
                label='Outlined'
                variant='outlined'
            />
        </Paper>
    );
};

export default FacilityForm;