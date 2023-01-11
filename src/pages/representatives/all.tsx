import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import {Button, Paper, Stack, Typography} from "@mui/material";
import representativeStore from "../../stores/representativeStore";
import {observer} from "mobx-react-lite";
import {RepresentativeService} from "../../services/RepresentativeService";
import {GetStaticProps, NextPage} from "next";
import {Representative} from "../../entities/representative";

interface TProps {
    representatives: Representative[];
}

export const getStaticProps: GetStaticProps = async () => {
    await RepresentativeService.getAllRepresentative();
    return {
        props: {
            representatives: representativeStore.representatives,
        },
    };
}

const All: NextPage<TProps> = observer((props) => {
    console.log(props)

    const columns = [
        {id: 'number', label: '№', minWidth: 5, align: "center"},
        {id: 'email', label: 'Email', minWidth: 150, align: "center"},
        {id: 'organizationRole', label: 'Role', minWidth: 150, align: "center"},
        {id: 'facility', label: 'Facility info', minWidth: 150, align: "center"},
        {id: 'action', label: 'Action', minWidth: 150, align: "center"}
    ];

    const handleChangePageNumber = (event: any, page: number) => {
        representativeStore.setPageNumber(page);
    };

    const handleChangePageSize = (event: any) => {
        representativeStore.setPageSize(+event.target.value)
        representativeStore.setPageNumber(0)
    };

    const displayData = (columnId: string, index: number, representative: any) => {
        switch (columnId) {
            case 'number':
                return (<div>{index + 1 + representativeStore.pageSize * representativeStore.pageNumber}</div>)
            case 'action':
                return (
                    <div>
                        <Button
                            style={{minWidth: "100px"}}
                            variant="contained"
                            color={"success"}
                        >
                            Edit
                        </Button>
                        {' '}
                        <Button
                            style={{minWidth: "100px"}}
                            variant="contained"
                            color={"error"}
                        >
                            remove
                        </Button>
                    </div>
                )
            case 'organizationRole':
                return representative[columnId].name
            case 'facility':
                return representative[columnId]?.id || 'not assign'
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
                    count={representativeStore.totalElements}
                    rowsPerPage={representativeStore.pageSize}
                    page={representativeStore.pageNumber}
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
                                props.representatives.map((representative, index) => {
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
