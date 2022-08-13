import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Staffs } from './staffs';
import { Departments } from './departments';
import { Payrolls } from './payrolls';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            payrolls: Payrolls,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}