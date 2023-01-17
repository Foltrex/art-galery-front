import Button from '@mui/material/Button';
import * as React from 'react';
import {Facility} from '../../entities/facility';
import FacilityForm from '../forms/FacilityForm';
import DeleteFacilityModal from '../modals/DeleteFacilityModal';

interface IFacilityTableItemProps {
    number: number,
    columnId: string,
    facility: Facility,
}

const FacilityTableItem: React.FC<IFacilityTableItemProps> = ({facility, number, columnId}) => {
    
    const [openEditFacilityModal, setOpenEditFacilityModal] = React.useState(false);

    const handleOpenEditFacilityModalClick = () => {
        setOpenEditFacilityModal(true);
    }

    const handleCloseEditFacilityModalClick = () => {
        setOpenEditFacilityModal(false);
    }

    const [openDeleteFacilityModal, setOpenDeleteFacilityModal] = React.useState(false);

    const handleOpenDeleteFacilityModalClick = () => {
        setOpenDeleteFacilityModal(true);
    }

    const handleCloseDeleteFacilityModalClick = () => {
        setOpenDeleteFacilityModal(false);
    }

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
                            color={"success"}
                            onClick={handleOpenEditFacilityModalClick}
                        >
                            Edit
                        </Button>
                        <FacilityForm 
                            open={openEditFacilityModal} 
                            handleClose={handleCloseEditFacilityModalClick} 
                            facility={facility}/>
                        {' '}
                        <Button
                            style={{minWidth: "100px"}}
                            variant="contained"
                            color={"error"}
                            onClick={handleOpenDeleteFacilityModalClick}
                        >
                            remove
                        </Button>
                        <DeleteFacilityModal open={openDeleteFacilityModal} handleClose={handleCloseDeleteFacilityModalClick} />
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
