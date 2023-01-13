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
          src='/images/logo.png' 
          alt={'Company logo'} 
          width='250' 
          height='250' />
      </Grid>
      <Grid item sm={5}>
        <Typography variant='h4'>
          Roga and Copita
        </Typography>
        <Divider />
        <Stack spacing={2} sx={{marginTop: 4}}>
          <Grid container>
            <Grid item sm={4}><strong>Status</strong></Grid>
            <Grid item sm={8}>Active</Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}><strong>Email</strong></Grid>
            <Grid item sm={8}>tonasdf@gmail.com</Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}><strong>Address</strong></Grid>
            <Grid item sm={8}>Bogdanovicha</Grid>
          </Grid>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2327.1556905573466!2d26.873946816081872!3d54.31887890911977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dc742535316e4f%3A0xc55af1e363a4e804!2sUlitsa%20M.bogdanovicha%2C%20Maladzie%C4%8Dna!5e0!3m2!1sen!2sby!4v1673598101285!5m2!1sen!2sby" 
            width="500" 
            height="350" 
            style={{border:'0'}} 
            allowFullScreen={false}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Account;