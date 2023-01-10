import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import {Button, Paper, Stack, Typography} from "@mui/material";
import representativeContainer from "../../stores/representativeContainer";
import {observer} from "mobx-react-lite";


const All = observer(() => {

    const columns = [
        {id: 'number', label: '№', minWidth: 5, align: "center"},
        // {id: 'firstname', label: 'Firstname', minWidth: 150, align: 'center'},
        // {id: 'lastname', label: 'Lastname', minWidth: 150, align: 'center'},
        {id: 'email', label: 'Email', minWidth: 150, align: "center"},
        {id: 'role', label: 'Role', minWidth: 150, align: "center"},
        {id: 'facility', label: 'Facility info', minWidth: 150, align: "center"},
        // {id: 'createdDate', label: 'Register date', minWidth: 100, align: '"center"'},
        {id: 'action', label: 'Action', minWidth: 150, align: "center"}
    ];

    const handleChangePage = () => {
        // representativeContainer.setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = () => {
        // dispatch(setSizePage(+event.target.value));
        // dispatch(setCurrentPage(0));
        representativeContainer.setPageNumber(0)
    };

    return (
        <div>
            <h1>Count: {representativeContainer.count}</h1>
            <Button variant={"contained"} color={"primary"}
                    onClick={() => representativeContainer.increment()}>+</Button>
            <Button variant={"contained"} color={"error"} onClick={() => representativeContainer.decrement()}>-</Button>
            <Paper sx={{width: '100%', overflow: 'hidden'}} style={{marginTop: "1%"}}>
                <Typography variant={"h4"} align={"center"}><b>Representative list</b></Typography>

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
                                representativeContainer.representatives
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
})

export default All;