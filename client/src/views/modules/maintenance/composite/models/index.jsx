import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ModelGrid from './Grid';
import ModelForm from './Form';
import Toolbar from './Toolbar';

import { getModels } from 'actions/models';
// ==============================|| SAMPLE PAGE ||============================== //

const ModelsPage = () => {
    const dispatch = useDispatch();
    const models = useSelector((state) => state.models);
    const [formVisible, setFormVisible] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);

    React.useEffect(() => {
        dispatch(getModels());
    }, [currentId, dispatch]);

    return (
        <MainCard title="MODELS LIST">
            <Toolbar formVisible={formVisible} setFormVisible={setFormVisible} setCurrentId={setCurrentId} />
            {formVisible ? (
                <ModelForm currentId={currentId} setCurrentId={setCurrentId} formVisible={formVisible} setFormVisible={setFormVisible} />
            ) : (
                <ModelGrid models={models} setCurrentId={setCurrentId} setFormVisible={setFormVisible} />
            )}
        </MainCard>
    );
};

export default ModelsPage;
