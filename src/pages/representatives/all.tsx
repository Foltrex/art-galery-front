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
import {RepresentativeService} from "../../services/RepresentativeService";


const All = observer(() => {

    const columns = [
        {id: 'number', label: '№', minWidth: 5, align: "center"},
        {id: 'email', label: 'Email', minWidth: 150, align: "center"},
        {id: 'role', label: 'Role', minWidth: 150, align: "center"},
        {id: 'facility', label: 'Facility info', minWidth: 150, align: "center"},
        {id: 'action', label: 'Action', minWidth: 150, align: "center"}
    ];

    const handleChangePageNumber = (event: any, page: number) => {
        representativeContainer.setPageNumber(page);
    };

    const handleChangePageSize = (event: any) => {
        representativeContainer.setPageSize(+event.target.value)
        representativeContainer.setPageNumber(0)
    };

    const displayData = (columnId: string, index: number, representative: any) => {
        switch (columnId) {
            case 'number':
                return (<div>{index + 1 + representativeContainer.pageSize * representativeContainer.pageNumber}</div>)
            case 'action':
                return (
                    <div>
                        {/*<Button*/}
                        {/*    style={{minWidth: "100px"}}*/}
                        {/*    variant="contained"*/}
                        {/*    color={user.isAccountNonLocked ? "error" : "success"}*/}
                        {/*    disabled={currentUser.id === user.id}*/}
                        {/*    onClick={*/}
                        {/*        user.isAccountNonLocked ?*/}
                        {/*            () => updateUserIsNonLocked(false, user.id) :*/}
                        {/*            () => updateUserIsNonLocked(true, user.id)*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    {user.isAccountNonLocked ? 'Block' : 'Unblock'}*/}
                        {/*</Button>*/}
                    </div>
                )
            // default:
            //     return representative[columnId]
        }
    }

    return (
        <div>
            <Paper sx={{width: '100%', overflow: 'hidden'}} style={{paddingTop: "1%"}}>
                <Button variant={"contained"} onClick={() => RepresentativeService.getAllRepresentative()}>Get
                    all</Button>

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
                    onPageChange={handleChangePageNumber}
                    onRowsPerPageChange={handleChangePageSize}
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
                                representativeContainer.representatives.map((representative, index) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell key={column.id} align={"center"}>
                                                        {displayData(column.id, index, representative)}
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