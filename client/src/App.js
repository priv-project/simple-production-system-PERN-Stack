import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import DisplayError from 'constants/DisplayError';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    // const isError = useSelector((state) => state.error.isError);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
            {/* {isError ? <DisplayError /> : ''} */}
        </StyledEngineProvider>
    );
};

export default App;
