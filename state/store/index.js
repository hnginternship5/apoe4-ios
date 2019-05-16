// IMPORT PACKAGE REFERENCES
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

// IMPORT MIDDLEWARE

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';


// IMPORT REDUCERS

import
reducers
from '../reducers';

const enhancer = compose(applyMiddleware(promise, thunk));
// CONFIGURE STORE
let store = createStore(reducers, {}, enhancer);

export default () => {
    return {
        store
    };
};