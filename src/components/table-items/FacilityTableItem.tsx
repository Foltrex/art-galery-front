import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';
import {Facility} from '../../entities/facility';
import FacilityForm from '../forms/FacilityForm';
import DeleteFacilityModal from '../modals/DeleteFacilityModal';

interface IFacilityTableItemProps {
    number: number,
    columnId: string,
    facility: Facility,
}

const FacilityTableItem: React.FC<IFacilityTableItemProps> = ({facility, number, columnId}) => {
    
    const [openEditFacilityModal, setOpenEditFacilityModal] = useState(false);
    const [openDeleteFacilityModal, setOpenDeleteFacilityModal] = useState(false);

    const displayData = (columnId: string, number: number, facility: any) => {

        switch (columnId) {
            case 'number':
                return (<div>{number}</div>);
            case 'action':
                return (
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
                );
            case 'address':
                return facility.address.streetName;
            case 'isActive':
                return facility[columnId] ? 'Active' : 'Inactive';
            default:
                return facility[columnId];
        }
    }

    return <>
        {displayData(columnId, number, facility)}
    </>;
};

export default FacilityTableItem;
