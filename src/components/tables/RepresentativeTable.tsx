import React from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {TRepresentativePageProps} from "../../pages/representatives/all";
import RepresentativeTableItem from "../table-items/RepresentativeTableItem";

const RepresentativeTable: React.FC<TRepresentativePageProps> = (props) => {
    const columns = [
        {id: 'number', label: '#', minWidth: 5, align: "center"},
        {id: 'email', label: 'Email', minWidth: 150, align: "center"},
        {id: 'organizationRole', label: 'Role', minWidth: 150, align: "center"},
        {id: 'facility', label: 'Facility info', minWidth: 150, align: "center"},
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
                        props.representatives.map((representative, index) => {
                            return (
                                <TableRow hover tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        return (
                                            <TableCell key={column.id} align={"center"}>
                                                <RepresentativeTableItem
                                                    number={index + 1 + props.pageSize * props.pageNumber}
                                                    columnId={column.id}
                                                    representative={representative}/>
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
    );
}

export default RepresentativeTable;