import * as React from 'react';
// MUI
import { FormControl, TextField, Autocomplete } from '@mui/material';

function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
        if (focused) {
            return 'This field is being focused';
        }
        return 'Helper text';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
}

const JComboBox = ({ children, value, id, label, labelId, name, placeholder, type, onChange, onBlur, size, options }) => {
    return (
        <FormControl fullWidth size={size ? size : 'small'}>
            <Autocomplete
                size="small"
                disablePortal
                options={options}
                getOptionLabel={(option) => option.part_code}
                renderInput={(params) => <TextField {...params} label="Equivalent Part" />}
            />
        </FormControl>
    );
};

export default JComboBox;
