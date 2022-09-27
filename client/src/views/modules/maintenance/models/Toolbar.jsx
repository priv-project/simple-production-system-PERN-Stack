import React from 'react';

// MUI
import { Button, Box } from '@mui/material';

// MATERIAL ICONS
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const Toolbar = ({ formVisible, setFormVisible }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Button
                variant="outlined"
                size="small"
                startIcon={formVisible ? <KeyboardReturnIcon /> : <AddIcon />}
                onClick={() => setFormVisible(!formVisible)}
            >
                {formVisible ? 'Return' : 'Add'}
            </Button>
        </Box>
    );
};

export default Toolbar;
