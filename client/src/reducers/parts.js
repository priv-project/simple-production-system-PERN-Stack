import * as actionTypes from 'constants/actionTypes';

export default (parts = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_PART:
            return action.payload.result;
        case actionTypes.CREATE:
            return [...parts, action.payload.result];
        case actionTypes.UPDATE:
            return parts.map((part) => (part.part_id === action.payload.result.part_id ? action.payload.result : part));
        case actionTypes.DELETE:
            return parts.filter((part) => part.part_id !== action.payload);
        default:
            return parts;
    }
};
