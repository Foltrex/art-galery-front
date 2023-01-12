import React, {useState} from 'react';
import TablePagination from '@mui/material/TablePagination';
import {Box, Button, Paper, Typography} from "@mui/material";
import representativeStore from "../../stores/representativeStore";
import {observer} from "mobx-react-lite";
import {RepresentativeService} from "../../services/RepresentativeService";
import {GetServerSideProps, NextPage} from "next";
import {Representative} from "../../entities/representative";
import {useRouter} from "next/router";
import RepresentativeTable from "../../components/tables/RepresentativeTable";
import RepresentativeForm from '../../components/forms/RepresentativeForm';

export interface TRepresentativePageProps {
    representatives: Representative[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
}

const All: NextPage<TRepresentativePageProps> = observer((props) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleOpenClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const updateQuery = (limit: number, page: number) => {
        router.push({
            pathname: router.pathname,
            query: {limit: limit, page: page},
        });
    };

    const handleChangePageNumber = (event: any, page: number) => {
        updateQuery(props.pageSize, page)
        representativeStore.setPageNumber(page);
    };

    const handleChangePageSize = (event: any) => {
        const size = +event.target.value;
        updateQuery(size, 0)
        representativeStore.setPageSize(size)
        representativeStore.setPageNumber(0)
    };

    return (
        <div>
            <Paper sx={{width: '100%', overflow: 'hidden'}} style={{paddingTop: "1%"}}>
                <Typography variant={"h4"} align={"center"}><b>Representatives</b></Typography>
                <Box textAlign='center' style={{marginTop: "10px"}}>
                    <Button variant={"contained"} color={"primary"} onClick={handleOpenClick}>Create
                        representative</Button>
                    <RepresentativeForm open={open} handleClose={handleClose}/>
                </Box>
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 20, 25]}
                    component="div"
                    count={props.totalElements}
                    rowsPerPage={props.pageSize}
                    page={props.pageNumber}
                    onPageChange={handleChangePageNumber}
                    onRowsPerPageChange={handleChangePageSize}
                />
                <RepresentativeTable representatives={props.representatives}
                                     pageNumber={props.pageNumber}
                                     pageSize={props.pageSize}
                                     totalElements={props.totalElements}
                />
            </Paper>
        </div>
    )
})

export default All;

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.query.page === undefined && context.query.limit === undefined) {
        return {
            redirect: {
                destination: '/representatives/all?page=0&limit=10',
                permanent: false,
            },
        }
    }
    await RepresentativeService.getAllRepresentative(Number(context.query.page), Number(context.query.limit));

    return {
        props: {
            representatives: representativeStore.representatives,
            pageNumber: representativeStore.pageNumber,
            pageSize: representativeStore.pageSize,
            totalElements: representativeStore.totalElements
        },
    };
}