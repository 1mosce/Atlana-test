import { combineReducers } from 'redux';


import  RequestReducer  from './features/Request';

const rootReducer = combineReducers({
    request: RequestReducer,
});

export default rootReducer;