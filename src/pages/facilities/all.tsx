import { Box, Button, TablePagination, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FacilityForm from '../../components/forms/FacilityForm';
import FacilityTable from '../../components/tables/FacilityTable';
import { Facility } from "../../entities/facility";
import { FacilityService } from '../../services/FacilityService';
import facilityStore from '../../stores/facilityStore';

export interface TFacilityPageProps {
    facilities?: Facility[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
}

const All: NextPage<TFacilityPageProps> = observer(({facilities, pageNumber, pageSize, totalElements}) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const updateQuery = (limit: number, page: number) => {
        router.push({
            pathname: router.pathname,
            query: {limit: limit, page: page},
        });
    }
    
    const handleChangePageNumber = (event: any, page: number) => {
        updateQuery(pageSize, page);
        facilityStore.setPageNumber(page);
    };

    const handleChangePageSize = (event: any) => {
        const size = +event.target.value;
        updateQuery(size, 0);
        facilityStore.setPageSize(size);
        facilityStore.setPageNumber(0);
    };
    
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
                <FacilityForm open={open} handleClose={handleClose} />
            </Box>
            <Paper sx={{width: '100%', overflow: 'hidden'}} style={{marginTop: "1%"}}>

                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25]}
                    component="div"
                    count={facilityStore.totalElements}
                    rowsPerPage={facilityStore.pageSize}
                    page={facilityStore.pageNumber}
                    onPageChange={handleChangePageNumber}
                    onRowsPerPageChange={handleChangePageSize}
                />
                <FacilityTable facilities={facilities}
                               pageNumber={pageNumber}
                               pageSize={pageSize}
                               totalElements={totalElements}/>
            </Paper>
        </div>
    );
});

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.query.page === undefined || context.query.limit === undefined) {
        return {
            redirect: {
                destination: '/facilities/all?page=0&limit=10',
                permanent: false,
            },
        }
    }
    await FacilityService.getAllFacilities(Number(context.query.page), Number(context.query.limit));

    return {
        props: {
            facilities: facilityStore.facilities,
            pageNumber: facilityStore.pageNumber,
            pageSize: facilityStore.pageSize,
            totalElements: facilityStore.totalElements
        },
    };
}

export default All;