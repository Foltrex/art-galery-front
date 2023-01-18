import React, { useState } from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { TFacilityPageProps } from '../../pages/facilities';
import FacilityForm from '../forms/FacilityForm';
import DeleteFacilityModal from '../modals/DeleteFacilityModal';

const FacilityTable: React.FC<TFacilityPageProps> = ({facilities, pageNumber, pageSize}) => {

    const columns = [
        {id: 'number', label: '#', minWidth: 5, align: "center"},
        {id: 'name', label: 'Name', minWidth: 150, align: "center"},
        {id: 'isActive', label: 'Activity', minWidth: 150, align: "center"},
        {id: 'address', label: 'Address', minWidth: 150, align: "center"},
        {id: 'organization', label: 'Organization', minWidth: 150, align: "center"},
        {id: 'action', label: 'Action', minWidth: 150, align: "center"}
    ];


    const [openEditFacilityModal, setOpenEditFacilityModal] = useState(false);
    const [openDeleteFacilityModal, setOpenDeleteFacilityModal] = useState(false);

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
                    {facilities.map((facility, index) => {
                        return (
                            <TableRow hover tabIndex={-1} key={index}>
                                <TableCell align='center'>
                                    {index + 1 + pageSize * pageNumber}
                                </TableCell>
                                <TableCell align='center'>{facility.name}</TableCell>
                                <TableCell align='center'>{facility.isActive}</TableCell>
                                <TableCell align='center'>
                                    {facility.address?.streetName}
                                </TableCell>
                                <TableCell align='center'>
                                    {facility.organization?.name}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <Button
                                            style={{minWidth: "100px"}}
                                            variant="contained"
                                            onClick={() => setOpenEditFacilityModal(true)}
                                        >
                                            Edit
                                        </Button>
                                        <FacilityForm 
                                            open={openEditFacilityModal} 
                                            handleClose={() => setOpenEditFacilityModal(false)} 
                                            facility={facility}/>
                                        {' '}
                                        <Button
                                            style={{minWidth: "100px"}}
                                            variant="contained"
                                            onClick={() => setOpenDeleteFacilityModal(true)}
                                        >
                                            remove
                                        </Button>
                                        <DeleteFacilityModal 
                                            open={openDeleteFacilityModal} 
                                            handleClose={() => setOpenDeleteFacilityModal(false)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>);
};

export default FacilityTable;