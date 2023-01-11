import { Typography, Stack, Button, TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import FacilityTable from '../../components/tables/FacilityTable';
import representativeContainer from '../../stores/representativeContainer';
import styles from './all.module.css';

const Facilities = () => {
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

    const arr = [
        {

        }
    ];

    return (
        <div>
            <Paper sx={{width: '100%', overflow: 'hidden'}} style={{marginTop: "1%"}}>
                <Typography variant={"h4"} align={"center"}><b>Facilities</b></Typography>

                <Stack direction="row" spacing={2} style={{marginLeft: "1%"}}>
                    <Button variant={"contained"} color={"error"}>Back to menu</Button>
                    <Button variant={"contained"} color={"primary"}>Create representative</Button>
                </Stack>
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
                            {
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
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default Facilities;