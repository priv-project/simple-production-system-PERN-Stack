import * as React from 'react';

const useApiRef = (columns, apiRef) => {
    const _columns = React.useMemo(() => columns, [columns]);

    return { apiRef, columns: _columns };
};

export default useApiRef;
