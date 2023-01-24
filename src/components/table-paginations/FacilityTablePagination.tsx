import React from "react";
import TablePagination from "@mui/material/TablePagination";
import {useRouter} from "next/router";
import rootStore from "../../stores/rootStore";

export interface TRepresentativePaginationProps {
    pageNumber: number,
    pageSize: number,
    totalElements: number,
}

const FacilityTablePagination: React.FC<TRepresentativePaginationProps> = (props) => {
    const router = useRouter();
    const {facilityStore} = rootStore;

    const updateQuery = (limit: number, page: number) => {
        router.push({
            pathname: router.pathname,
            query: {limit: limit, page: page},
        });
    };

    const handleChangePageNumber = (event: any, page: number) => {
        updateQuery(props.pageSize, page)
        facilityStore.setPageNumber(page);
    };

    const handleChangePageSize = (event: any) => {
        const size = +event.target.value;
        updateQuery(size, 0)
        facilityStore.setPageSize(size)
        facilityStore.setPageNumber(0)
    };

    return (
        <TablePagination
            rowsPerPageOptions={[1, 5, 10, 20, 25]}
            component="div"
            count={props.totalElements}
            rowsPerPage={props.pageSize}
            page={props.pageNumber}
            onPageChange={handleChangePageNumber}
            onRowsPerPageChange={handleChangePageSize}
        />
    )
}

export default FacilityTablePagination
