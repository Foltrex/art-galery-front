import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { TFacilityPageProps } from '../../pages/facilities/all';
import FacilityTableItem from '../table-items/FacilityTableItem';

const FacilityTable: React.FC<TFacilityPageProps> = ({facilities, pageNumber, pageSize}) => {

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
                    {
                        facilities.map((facility, index) => {
                            return (
                                <TableRow hover tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        return (
                                            <TableCell key={column.id} align={"center"}>
                                                <FacilityTableItem
                                                    number={index + 1 + pageSize * pageNumber}
                                                    columnId={column.id}
                                                    facility={facility}/>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>);
};

export default FacilityTable;