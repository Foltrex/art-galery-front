import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const Account = () => {
  return (
    <Grid container sx={{ marginX: '2%', marginTop: '3%' }} spacing={4}>
      <Grid item sm={3}>
        <Image 
          src='/images/profile.webp' 
          alt={'User avatar'} 
          width='250' 
          height='250' />
      </Grid>
      <Grid item sm={5}>
        <Typography variant='h4'>
          Alex Mayson
        </Typography>
        <Divider />
        <Stack spacing={2} sx={{marginTop: 4}}>
          <Grid container>
            <Grid item sm={4}><strong>Email</strong></Grid>
            <Grid item sm={8}>tonasdf@gmail.com</Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}><strong>Account Type</strong></Grid>
            <Grid item sm={8}>Representative</Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Account;