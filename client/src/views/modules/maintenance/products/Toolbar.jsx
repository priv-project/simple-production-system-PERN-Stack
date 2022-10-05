import React from 'react';

// MUI
import { Button, Box } from '@mui/material';

// MATERIAL ICONS
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const Toolbar = ({ formVisible, setFormVisible, setCurrentId }) => {
    const handleClick = () => {
        setFormVisible(!formVisible);
        setCurrentId(0);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Button variant="outlined" size="small" startIcon={formVisible ? <KeyboardReturnIcon /> : <AddIcon />} onClick={handleClick}>
                {formVisible ? 'Return' : 'Add'}
            </Button>
        </Box>
    );
};

export const PartGridToolbar = ({ addPartGridVisible, setAddPartGridVisible }) => {
    const handleClick = () => {
        setAddPartGridVisible(!addPartGridVisible);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Button
                variant="outlined"
                size="small"
                startIcon={addPartGridVisible ? <KeyboardReturnIcon /> : <AddIcon />}
                onClick={handleClick}
            >
                {addPartGridVisible ? 'Return' : 'Add'}
            </Button>
        </Box>
    );
};
