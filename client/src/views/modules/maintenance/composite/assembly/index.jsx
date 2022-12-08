import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AssemblyGrid from './Grid';
import AssemblyForm from './Form';
import Toolbar from './Toolbar';

import { getAssembly } from 'redux/maintenance/composite/actions/assembly';
import { getModels } from 'redux/maintenance/composite/actions/models';
import { getParts } from 'redux/maintenance/composite/actions/parts';
// ==============================|| SAMPLE PAGE ||============================== //

const AssemblyPage = () => {
    const dispatch = useDispatch();

    const assembly = useSelector((state) => state.assembly);
    const models = useSelector((state) => state.models);
    const parts = useSelector((state) => state.parts);

    const [formVisible, setFormVisible] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);

    React.useEffect(() => {
        dispatch(getAssembly());
        dispatch(getModels());
        dispatch(getParts());
    }, [currentId, dispatch]);

    return (
        <MainCard title="ASSEMBLY">
            <Toolbar formVisible={formVisible} setFormVisible={setFormVisible} setCurrentId={setCurrentId} />
            {formVisible ? (
                <AssemblyForm
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    formVisible={formVisible}
                    setFormVisible={setFormVisible}
                    models={models}
                    parts={parts}
                />
            ) : (
                <AssemblyGrid data={assembly} setCurrentId={setCurrentId} setFormVisible={setFormVisible} />
            )}
        </MainCard>
    );
};

export default AssemblyPage;
