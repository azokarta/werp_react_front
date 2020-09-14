import {
  FETCH_SMSETPLP_BY_ID,
  FETCH_SMSETPLP_LIST,
  POST_SMSETPLP_FORM,
  UPDATE_SMSETPLP,
} from './smsetplpAction';

const INITIAL_STATE = {
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SMSETPLP_BY_ID:
      return {
        ...state,
        smsetplpById: [...action.data.data],
      };
    case FETCH_SMSETPLP_LIST:
      return {
        ...state,
        smsetplpList: [...action.data.data],
      };
    case POST_SMSETPLP_FORM:
      return {
        ...state,
        postSmsetplpForm: [...action.data.data],
      };
    case UPDATE_SMSETPLP:
      return {
        ...state,
        updateSmsetplp: [...action.data.data],
      };

    default:
      return state;
  }
}
