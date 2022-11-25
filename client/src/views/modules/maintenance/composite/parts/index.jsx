import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import PartGrid from './Grid';
import PartGrid from './Grid';
import PartForm from './Form';
import Toolbar from './Toolbar';

// ACTIONS
import { getParts } from 'actions/maintenance/composite/parts';
import { getModels } from 'actions/maintenance/composite/models';
// ==============================|| SAMPLE PAGE ||============================== //

const PartsPage = () => {
    const dispatch = useDispatch();
    const parts = useSelector((state) => state.parts);
    const models = useSelector((state) => state.models);
    const [formVisible, setFormVisible] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);
    console.log(parts);
    React.useEffect(() => {
        dispatch(getParts());
        dispatch(getModels());
    }, [currentId, dispatch]);

    return (
        <MainCard title="PARTS">
            <Toolbar formVisible={formVisible} setFormVisible={setFormVisible} setCurrentId={setCurrentId} />
            {formVisible ? (
                <PartForm
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    formVisible={formVisible}
                    setFormVisible={setFormVisible}
                    models={models}
                />
            ) : (
                <PartGrid data={parts} setCurrentId={setCurrentId} setFormVisible={setFormVisible} />
            )}
        </MainCard>
    );
};

export default PartsPage;
