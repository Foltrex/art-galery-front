import React, {useEffect, useState} from 'react';
import {Box, Button, Paper, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {RepresentativeService} from "../../services/RepresentativeService";
import {GetServerSideProps, NextPage} from "next";
import {Representative} from "../../entities/representative";
import RepresentativeTable from "../../components/tables/RepresentativeTable";
import RepresentativeForm from '../../components/forms/RepresentativeForm';
import representativeStore from "../../stores/representativeStore";
import RepresentativeTablePagination from "../../components/table-paginations/RepresentativeTablePagination";

export interface TRepresentativePageProps {
    representatives: Representative[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
}

const Index: NextPage<TRepresentativePageProps> = observer(({representatives = [], pageNumber, pageSize, totalElements}) => {
    const [open, setOpen] = useState(false);

    const handleOpenClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Paper sx={{width: '100%', overflow: 'hidden'}} style={{paddingTop: "1%"}}>
                <Typography variant={"h4"} align={"center"}><b>Representatives</b></Typography>
                <Box textAlign='center' style={{marginTop: "10px"}}>
                    <Button variant={"contained"} color={"primary"} onClick={handleOpenClick}>Create
                        representative</Button>
                    <RepresentativeForm open={open} handleClose={handleClose}/>
                </Box>
                <RepresentativeTablePagination
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalElements={totalElements}
                />
                <RepresentativeTable representatives={representatives}
                                     pageNumber={pageNumber}
                                     pageSize={pageSize}
                                     totalElements={totalElements}
                />
            </Paper>
        </div>
    )
})

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.query.page === undefined || context.query.limit === undefined) {
        return {
            redirect: {
                destination: '/representatives?page=0&limit=10',
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