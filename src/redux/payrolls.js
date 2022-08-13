import * as ActionTypes from './ActionTypes';

export const Payrolls = (state = {
    isLoading: true,
    errMess: null,
    payrolls: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PAYROLLS: 
            return {...state, isLoading: false, errMess: null, payrolls: action.payload}
        case ActionTypes.LOADING_PAYROLLS:
            return {...state, isLoading: true, errMess: null, payrolls: []}
        case ActionTypes.PAYROLLS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, payrolls: []}
        default:
            return state
    }
}