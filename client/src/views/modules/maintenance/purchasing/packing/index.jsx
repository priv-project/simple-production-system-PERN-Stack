import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Grid from './Grid';
import Form from './Form';
import Toolbar from './Toolbar';

// ACTIONS

// ==============================|| SAMPLE PAGE ||============================== //

const Packing = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);

    useSelector((state) => console.log(state.packings));
    return (
        <MainCard title="PACKING">
            <Toolbar formVisible={formVisible} setFormVisible={setFormVisible} setCurrentId={setCurrentId} />
            {formVisible ? (
                <Form currentId={currentId} setCurrentId={setCurrentId} formVisible={formVisible} setFormVisible={setFormVisible} />
            ) : (
                <Grid currentId={currentId} setCurrentId={setCurrentId} setFormVisible={setFormVisible} />
            )}
        </MainCard>
    );
};

export default Packing;
