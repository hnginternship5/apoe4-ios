import {
    combineReducers
} from 'redux';

import {
    actionReducer
} from './reducer'

export default combineReducers({
    states: actionReducer
});