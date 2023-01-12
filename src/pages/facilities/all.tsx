import { Typography, Stack, Button, TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import FacilityForm from '../../components/forms/FacilityForm';
import FacilityTable from '../../components/tables/FacilityTable';
import representativeContainer from '../../stores/representativeStore';
import styles from './all.module.css';

const All = () => {
    const columns = [
        {id: 'number', label: '#', minWidth: 5, align: "center"},
        // {id: 'firstname', label: 'Firstname', minWidth: 150, align: 'center'},
        // {id: 'lastname', label: 'Lastname', minWidth: 150, align: 'center'},
        {id: 'email', label: 'Name', minWidth: 150, align: "center"},
        {id: 'role', label: 'Activity', minWidth: 150, align: "center"},
        {id: 'facility', label: 'Address', minWidth: 150, align: "center"},
        // {id: 'createdDate', label: 'Register date', minWidth: 100, align: '"center"'},
        {id: 'action', label: 'Organization', minWidth: 150, align: "center"}
    ];

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
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={"center"}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        <b>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {
                                facilityContainer.facilities
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column) => {
                                                    return (
                                                        <TableCell key={column.id}>

                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                            } */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default All;