import React, { useState } from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {TRepresentativePageProps} from "../../pages/representatives";
import DeleteRepresentativeModal from '../modals/DeleteRepresentativeModal';
import { Button } from '@mui/material';
import RepresentativeForm from '../forms/RepresentativeForm';

const RepresentativeTable: React.FC<TRepresentativePageProps> = ({
    representatives, 
    pageNumber, 
    pageSize, 
    totalElements, 
    facilities
}) => {

    const columns = [
        {id: 'number', label: '#', minWidth: 5, align: "center"},
        {id: 'firstname', label: 'firstname', minWidth: 5, align: "center"},
        {id: 'lastname', label: 'lastname', minWidth: 5, align: "center"},
        {id: 'email', label: 'Email', minWidth: 150, align: "center"},
        {id: 'organizationRole', label: 'Role', minWidth: 150, align: "center"},
        {id: 'facility', label: 'Facility info', minWidth: 150, align: "center"},
        {id: 'action', label: 'Action', minWidth: 150, align: "center"}
    ];


    const [openEditRepresentativeModal, setOpenEditRepresentativeModal] = useState(false);
    const [openDeleteRepresentativeModal, setOpenDeleteRepresentativeModal] = useState(false);

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
                    {representatives.map((representative, index) => {
                        const { firstname, lastname, organizationRole, facility } = representative;
                        return (
                            <TableRow hover tabIndex={-1} key={index}>
                                <TableCell align='center'>{index + 1 + pageSize * pageNumber}</TableCell>
                                <TableCell align='center'>{firstname}</TableCell>
                                <TableCell align='center'>{lastname}</TableCell>
                                <TableCell align='center'></TableCell>
                                <TableCell align='center'>{organizationRole.name}</TableCell>
                                <TableCell align='center'>{facility.name}</TableCell>
                                <TableCell align='center'>
                                    <div>
                                        <Button
                                            style={{minWidth: "100px"}}
                                            variant="contained"
                                            color={"success"}
                                            onClick={() => setOpenEditRepresentativeModal(true)}
                                        >
                                            Edit
                                        </Button>
                                        <RepresentativeForm 
                                            open={openEditRepresentativeModal} 
                                            handleClose={() => setOpenEditRepresentativeModal(false)}
                                            representative={representative} />

                                        {' '}
                                        <Button
                                            style={{minWidth: "100px"}}
                                            variant="contained"
                                            color={"error"}
                                            onClick={() => setOpenDeleteRepresentativeModal(true)}
                                        >
                                            Remove
                                        </Button>
                                        <DeleteRepresentativeModal 
                                            open={openDeleteRepresentativeModal} 
                                            handleClose={() => setOpenDeleteRepresentativeModal(false)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RepresentativeTable;