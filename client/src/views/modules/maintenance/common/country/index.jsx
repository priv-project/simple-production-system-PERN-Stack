import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import CountryGrid from './Grid';
import CountryGrid from './Grid';
import CountryForm from './Form';
import Toolbar from './Toolbar';

// ACTIONS
import { getCountrys } from 'redux/maintenance/common/actions/country';
// ==============================|| SAMPLE PAGE ||============================== //

const CountrysPage = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);

    return (
        <MainCard title="COUNTRY">
            <Toolbar formVisible={formVisible} setFormVisible={setFormVisible} setCurrentId={setCurrentId} />
            {formVisible ? (
                <CountryForm currentId={currentId} setCurrentId={setCurrentId} formVisible={formVisible} setFormVisible={setFormVisible} />
            ) : (
                <CountryGrid currentId={currentId} setCurrentId={setCurrentId} setFormVisible={setFormVisible} />
            )}
        </MainCard>
    );
};

export default CountrysPage;
