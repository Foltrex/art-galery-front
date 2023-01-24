import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {GetServerSideProps, NextPage} from "next";
import {TokenService} from "../services/TokenService";
import {OrganizationService} from "../services/OrganizationService";
import {OrganizationStatusEnum} from "../entities/enums/organizationStatusEnum";
import {Address} from "../entities/address";
import {Organization} from "../entities/organization";

interface TProps {
    organization: Organization,
}

const getStatusColor = (status: OrganizationStatusEnum) => {
    switch (status) {
        case OrganizationStatusEnum.INACTIVE:
            return "red"
        case OrganizationStatusEnum.NEW:
            return "orange"
        case OrganizationStatusEnum.ACTIVE:
            return "green"
    }
}

const parseAddress = (address: Address) => {
    return address.city.name + ", " + address.streetName + " " + address.streetNumber;
}

const Account: NextPage<TProps> = (props) => {

    return (
        <Grid container
              spacing={0}
              sx={{marginTop: "4%"}}
              justifyContent="center"
        >
            <Grid item sm={3}>
                <Image
                    src='/images/logo.png'
                    alt={'Company logo'}
                    width='250'
                    height='250'/>
            </Grid>
            <Grid item sm={5}>
                <Typography variant='h4'>
                    {props.organization.name ? props.organization.name : 'The name is not set'}
                </Typography>
                <Divider/>
                <Stack spacing={2} sx={{marginTop: 4}}>
                    <Grid container>
                        <Grid item sm={4}><strong>Status</strong></Grid>
                        <Grid item sm={8}>
                            <span style={{color: getStatusColor(props.organization.status)}}>
                                {props.organization.status}</span>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm={4}><strong>Email</strong></Grid>
                        <Grid item sm={8}>tonasdf@gmail.com</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm={4}><strong>Address</strong></Grid>
                        <Grid item sm={8}>
                            {props.organization.address ? parseAddress(props.organization.address) : "The address is not set"}
                        </Grid>
                    </Grid>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2327.1556905573466!2d26.873946816081872!3d54.31887890911977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dc742535316e4f%3A0xc55af1e363a4e804!2sUlitsa%20M.bogdanovicha%2C%20Maladzie%C4%8Dna!5e0!3m2!1sen!2sby!4v1673598101285!5m2!1sen!2sby"
                        width="600"
                        height="350"
                        style={{border: '0'}}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"/>
                </Stack>
            </Grid>
        </Grid>
    );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.token
    if (token === undefined) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false,
            },
        }
    }

    const decoded = TokenService.decode(token)
    const organization = await OrganizationService.getOrganizationByAccountId(decoded.id);

    return {
        props: {
            organization: organization,
        }
    }
}

export default Account;