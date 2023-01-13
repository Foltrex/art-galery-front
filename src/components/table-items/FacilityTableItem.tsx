import Button from '@mui/material/Button';
import * as React from 'react';
import { Facility } from '../../entities/facility';

interface IFacilityTableItemProps {
    number: number,
    columnId: string,
    facility: Facility,
}

const FacilityTableItem: React.FC<IFacilityTableItemProps> = ({facility, number, columnId}) => {
    const displayData = (columnId: string, number: number, facility: Facility) => {
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
            // case 'organizationRole':
            //     return facility[columnId].name
            // case 'facility':
            //     return facility[columnId]?.id || 'not assign'
            default:
                return 'something'
                // return representative[columnId]
        }
    }

    return <>
            {displayData(columnId, number, facility)}
    </>;
};

export default FacilityTableItem;
