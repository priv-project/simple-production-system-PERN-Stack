import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ModelGrid from './Grid';

import { getModels } from 'actions/models';
// ==============================|| SAMPLE PAGE ||============================== //

const ModelsPage = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getModels());
    }, [dispatch]);

    return (
        <MainCard title="MODELS LIST">
            <ModelGrid />
        </MainCard>
    );
};

export default ModelsPage;
