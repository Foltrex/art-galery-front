import { Typography, Stack, Button, TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import FacilityForm from '../../components/forms/FacilityForm';
import FacilityTable from '../../components/tables/FacilityTable';
import representativeContainer from '../../stores/representativeStore';
import styles from './all.module.css';
import {Representative} from "../../entities/representative";
import {Facility} from "../../entities/facility";
import { observer } from 'mobx-react-lite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import facilityStore from '../../stores/facilityStore';

export interface TFacilityPageProps {
    facilities: Facility[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
}

const All: NextPage<TFacilityPageProps> = observer((props) => {
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
        updateQuery(props.pageSize, page);
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
                    count={representativeContainer.totalElements}
                    rowsPerPage={representativeContainer.pageSize}
                    page={representativeContainer.pageNumber}
                    onPageChange={handleChangePageNumber}
                    onRowsPerPageChange={handleChangePageSize}
                />
                <FacilityTable facilities={props.facilities}
                               pageNumber={props.pageNumber}
                               pageSize={props.pageSize}
                               totalElements={props.totalElements}/>
            </Paper>
        </div>
    );
});

export default All;