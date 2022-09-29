import * as React from 'react';
// MUI
import { TextField, FormControl } from '@mui/material';

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

const JTextField = ({ value, label, name, placeholder, type, onChange, onBlur, size, rows, errors, touched }) => {
    // {
    //     touched.user_username && errors.user_username;
    // }
    let error = false;
    if (errors[name] && touched[name]) error = true;

    if (type !== 'multiline') {
        return (
            <FormControl fullWidth className="xxxx">
                <TextField
                    size={size ? size : 'small'}
                    label={label}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    helperText={errors[name]}
                    error={error}
                />
            </FormControl>
        );
    } else {
        return (
            <FormControl fullWidth>
                <TextField
                    size={size ? size : 'small'}
                    label={label}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    multiline
                    rows={rows}
                    helperText={errors[name]}
                    error={error}
                />
            </FormControl>
        );
    }
};

export default JTextField;
