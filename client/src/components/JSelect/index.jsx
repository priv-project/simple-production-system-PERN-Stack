import * as React from 'react';
// MUI
import { Select, InputLabel, FormControl } from '@mui/material';

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

const JSelect = ({ children, value, id, label, labelId, name, placeholder, type, onChange, onBlur, size, rows }) => {
    return (
        <FormControl fullWidth size={size ? size : 'small'}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select labelId={labelId} id={id ? id : name} name={name} value={value} label={label} onBlur={onBlur} onChange={onChange}>
                {children}
            </Select>
        </FormControl>
    );
};

export default JSelect;
