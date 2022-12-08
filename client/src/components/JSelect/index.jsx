import * as React from 'react';
// MUI
import { Select, InputLabel, FormControl, FormHelperText } from '@mui/material';

// function MyFormHelperText() {
//     const { focused } = useFormControl() || {};

//     const helperText = React.useMemo(() => {
//         if (focused) {
//             return 'This field is being focused';
//         }
//         return 'Helper text';
//     }, [focused]);

//     return <FormHelperText>{helperText}</FormHelperText>;
// }

const JSelect = ({ children, value, id, label, labelId, name, placeholder, type, onChange, onBlur, size, rows, errors, touched }) => {
    let error = false;
    if (errors[name] && touched[name]) error = true;

    return (
        <FormControl fullWidth size={size ? size : 'small'} error={error}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select labelId={labelId} id={id ? id : ''} name={name} value={value} label={label} onChange={onChange}>
                {children}
            </Select>
            <FormHelperText>{errors[name]}</FormHelperText>
        </FormControl>
    );
};

export default JSelect;
