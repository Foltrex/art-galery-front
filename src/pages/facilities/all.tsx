import { Typography, Stack, Button, TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import FacilityForm from '../../components/forms/FacilityForm';
import FacilityTable from '../../components/tables/FacilityTable';
import representativeContainer from '../../stores/representativeStore';
import styles from './all.module.css';
import {Representative} from "../../entities/representative";
import {Facility} from "../../entities/facility";

export interface TFacilityPageProps {
    representatives: Facility[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
}

const All = () => {

    const handleChangePage = () => {
        // representativeContainer.setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = () => {
        // dispatch(setSizePage(+event.target.value));
        // dispatch(setCurrentPage(0));
        representativeContainer.setPageNumber(0)
    };
    
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
                <FacilityForm open={open} handleClose={handleClose} />
            </Box>
            <Paper sx={{width: '100%', overflow: 'hidden'}} style={{marginTop: "1%"}}>

                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25]}
                    component="div"
                    count={representativeContainer.totalElements}
                    rowsPerPage={representativeContainer.pageSize}
                    page={representativeContainer.pageNumber}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <FacilityTable/>
            </Paper>
        </div>
    );
};

export default All;