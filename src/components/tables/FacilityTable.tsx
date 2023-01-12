import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const FacilityTable = () => {

    const columns = [
        {id: 'number', label: '#', minWidth: 5, align: "center"},
        {id: 'name', label: 'Name', minWidth: 150, align: "center"},
        {id: 'isActive', label: 'Activity', minWidth: 150, align: "center"},
        {id: 'address', label: 'Address', minWidth: 150, align: "center"},
        {id: 'organization', label: 'Organization', minWidth: 150, align: "center"},
        {id: 'action', label: 'Action', minWidth: 150, align: "center"}
    ];


    return (
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
        </TableContainer>);
};

export default FacilityTable;