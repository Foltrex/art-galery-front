import React, { useState } from "react";
import {Button} from "@mui/material";
import {Representative} from "../../entities/representative";
import DeleteFacilityModal from "../modals/DeleteFacilityModal";
import RepresentativeForm from "../forms/RepresentativeForm";

interface IRepresentativeTableItemProps {
    number: number,
    columnId: string,
    representative: Representative,
}

const RepresentativeTableItem: React.FC<IRepresentativeTableItemProps> = (props) => {

    const [openEditRepresentativeModal, setOpenEditRepresentativeModal] = useState(false);
    const [openDeleteRepresentativeModal, setOpenDeleteRepresentativeModal] = useState(false);
    
    const displayData = (columnId: string, number: number, representative: any) => {
        switch (columnId) {
            case 'number':
                return (<div>{number}</div>)
            case 'action':
                return (
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
                            remove
                        </Button>
                        <DeleteFacilityModal 
                            open={openDeleteRepresentativeModal} 
                            handleClose={() => setOpenDeleteRepresentativeModal(false)} />
                    </div>
                )
            case 'organizationRole':
                return representative[columnId].name
            case 'facility':
                return representative[columnId]?.id || 'not assign'
            default:
                return representative[columnId]
        }
    }

    return (
        <>{displayData(props.columnId, props.number, props.representative)}</>
    )
}

export default RepresentativeTableItem