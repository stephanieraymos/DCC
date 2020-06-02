import * as ActionTypes from './ActionTypes';

export const admins = (state = { isLoading: true,
                                     errMess: null,
                                     admins: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ADMINS:
            return {...state, isLoading: false, errMess: null, admins: action.payload};

        case ActionTypes.ADMINS_LOADING:
            return {...state, isLoading: true, errMess: null, admins: []}

        case ActionTypes.ADMINS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};