import * as React from 'react';
// MUI
import { FormControl, TextField, Autocomplete, FormHelperText } from '@mui/material';

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

const JComboBox = ({
    children,
    value,
    id,
    label,
    labelId,
    name,
    placeholder,
    type,
    onChange,
    onBlur,
    size,
    touched,
    errors,
    options,
    getOptionLabel,
    setFieldValue
}) => {
    let error = false;
    if (errors[name] && touched[name]) error = true;

    return (
        <FormControl fullWidth error={error}>
            <Autocomplete
                size={size ? size : 'small'}
                name={name}
                disablePortal
                options={options}
                // onChange={onChange}
                onChange={(event, newValue, type) => {
                    if (type === 'clear') {
                        setFieldValue(name, '');
                    } else {
                        setFieldValue(name, newValue.id);
                    }
                }}
                onBlur={onBlur}
                getOptionLabel={getOptionLabel}
                renderInput={(params) => <TextField {...params} label={label} error={error} />}
            />
            <FormHelperText>{errors[name]}</FormHelperText>
        </FormControl>
    );
};

export default JComboBox;
