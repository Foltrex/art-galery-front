import {Box, Button, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import {observer} from 'mobx-react-lite';
import {GetServerSideProps, NextPage} from 'next';
import React, {useState} from 'react';
import FacilityForm from '../../components/forms/FacilityForm';
import FacilityTable from '../../components/tables/FacilityTable';
import {Facility} from "../../entities/facility";
import {FacilityService} from '../../services/FacilityService';
import FacilityTablePagination from "../../components/table-paginations/FacilityTablePagination";
import { OrganizationService } from '../../services/OrganizationService';
import { Organization } from '../../entities/organization';
import { useRootStore } from '../rootStoreAdapter';

export interface TFacilityPageProps {
    facilities: Facility[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    organizations: Organization[]
}

const Index: NextPage<TFacilityPageProps> = observer(({
    facilities = [], 
    pageNumber, 
    pageSize, 
    totalElements,
    organizations
}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography variant={"h4"} align={"left"}><b>Facilities</b></Typography>
                <Button
                    style={{marginLeft: '1%'}}
                    variant={"contained"}
                    color={"primary"}
                    onClick={handleClickOpen}
                >
                    Create facility
                </Button>
                <FacilityForm 
                    open={open} 
                    handleClose={handleClose} 
                    facility={{} as Facility} 
                    organizations={organizations} 
                />
            </Box>
            <Paper sx={{width: '100%', overflow: 'hidden'}} style={{marginTop: "1%"}}>
                <FacilityTablePagination
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalElements={totalElements}
                />
                <FacilityTable
                    facilities={facilities}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalElements={totalElements}
                    organizations={organizations}/>
            </Paper>
        </div>
    );
});

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.query.page === undefined || context.query.limit === undefined) {
        return {
            redirect: {
                destination: '/facilities?page=0&limit=10',
                permanent: false,
            },
        }
    }
    
    await FacilityService.getAllFacilities(Number(context.query.page), Number(context.query.limit));
    await OrganizationService.getAllOrganizations();
    
    const { facilityStore, organizationStore } = useRootStore();
    return {
        props: {
            facilities: facilityStore.facilities,
            pageNumber: facilityStore.pageNumber,
            pageSize: facilityStore.pageSize,
            totalElements: facilityStore.totalElements,
            organizations: organizationStore.organizations
        },
    };
}

export default Index;