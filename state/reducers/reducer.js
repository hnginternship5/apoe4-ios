import {
    options
} from './options';

export const actionReducer = (
    state = {
        result: {},
        fetching: false,
        fetched: false,
        error: null,
        state: 'default'
    },
    action
) => {
    const entity = action.type.split("_").splice(0, 3).join("_")
    switch (action.type) {
        case `${entity}_FULFILLED`:
            return {
                ...state,
                fetching: false,
                    fetched: true,
                    failed: false,
                    [`${options[entity]}_state`]: 'success',
                    [options[entity]]: action.payload
            };

        case `${entity}_FAILED`:

            return {
                ...state,
                fetching: false,
                    fetched: false,
                    failed: true,
                    [`${options[entity]}_state`]: 'failed',
                    [`${options[entity]}_error`]: action.payload
            };

        case `${entity}_REJECTED`:
            return {
                ...state,
                fetching: false,
                    fetched: false,
                    failed: true,
                    [`${options[entity]}_state`]: 'failed',
                    [`${options[entity]}_error`]: action.payload
            };

        case `${entity}_PENDING`:
            return {
                ...state,
                fetching: true,
                    fetched: false,
                    failed: false,
                    [`${options[entity]}_state`]: 'pending'
            };
        case `USER_LOGOUT_FULFILLED`:
            return {};
        default:
            return state;
    }
};