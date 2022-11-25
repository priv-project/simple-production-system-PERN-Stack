import * as actionTypes from 'constants/actionTypes';

export default (parts = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_PARTS:
            return action.payload.result;
        case actionTypes.CREATE_PART:
            return [...parts, action.payload.result];
        case actionTypes.UPDATE_PART:
            return parts.map((part) => (part.part_id === action.payload.result.part_id ? action.payload.result : part));
        case actionTypes.DELETE_PART:
            return parts.filter((part) => part.part_id !== action.payload);
        default:
            return parts;
    }
};
