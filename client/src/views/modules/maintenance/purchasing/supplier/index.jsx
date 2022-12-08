import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import PartGrid from './Grid';
import Grid from './Grid';
import Form from './Form';
import Toolbar from './Toolbar';

// ACTIONS
import { getParts } from 'redux/maintenance/composite/actions/parts';
import { getModels } from 'redux/maintenance/composite/actions/models';
// ==============================|| SAMPLE PAGE ||============================== //

const PartsPage = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);

    // React.useEffect(() => {
    //     dispatch(getParts());
    // }, [currentId, dispatch]);

    return (
        <MainCard title="SUPPLIER">
            <Toolbar formVisible={formVisible} setFormVisible={setFormVisible} setCurrentId={setCurrentId} />
            {formVisible ? (
                <Form currentId={currentId} setCurrentId={setCurrentId} formVisible={formVisible} setFormVisible={setFormVisible} />
            ) : (
                <></>
                // <PartGrid data={parts} setCurrentId={setCurrentId} setFormVisible={setFormVisible} />
            )}
        </MainCard>
    );
};

export default PartsPage;
