import React from "react";
import {Button} from "@mui/material";
import {Representative} from "../../entities/representative";

interface IRepresentativeTableItemProps {
    number: number,
    columnId: string,
    representative: Representative,
}

const RepresentativeTableItem: React.FC<IRepresentativeTableItemProps> = (props) => {

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
            default:
                return representative[columnId]
        }
    }

    return (
        <>{displayData(props.columnId, props.number, props.representative)}</>
    )
}

export default RepresentativeTableItem