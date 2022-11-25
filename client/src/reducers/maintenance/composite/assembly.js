import * as actionTypes from 'constants/actionTypes';

export default (assembly = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_ASSEMBLY:
            return action.payload.result;
        case actionTypes.CREATE_ASSEMBLY:
            return [...assembly, action.payload.result];
        case actionTypes.UPDATE_ASSEMBLY:
            return assembly.map((assy) => (assy.assembly_id === action.payload.result.assembly_id ? action.payload.result : assy));
        case actionTypes.DELETE_ASSEMBLY:
            return assembly.filter((assy) => assy.assembly_id !== action.payload);
        default:
            return assembly;
    }
};
