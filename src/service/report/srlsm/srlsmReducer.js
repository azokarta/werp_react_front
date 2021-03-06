import {
  FETCH_SRLSM,
  CLEAR_SRLSM,
  FETCH_SERVICE_TYPE_LIST,
  FETCH_ACCEPT_PAYMENT_USERS,
  FETCH_MASTER_LIST,
  FETCH_OPERATOR_LIST,
} from './srlsmAction';

const INITIAL_STATE = {
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRLSM:
      // console.log('REDUCE SRLSM', action.data.data);
      return {
        ...state,
        srlsmListData: { ...action.data.data.listData },
        srlsmListSum: { ...action.data.data.listSum },
        srlsmTotalPages: action.data.data.listData.totalPages,
        premiumSum: [...action.data.data.premiumSum],
      };

    case CLEAR_SRLSM:
      return {
        ...state,
        srlsmListData: {},
        srlsmListSum: {},
        srlsmTotalPages: 0,
        premiumSum: [],
      };
    case FETCH_SERVICE_TYPE_LIST:
      return {
        ...state,
        serviceTypeList: [...action.data.data],
      };
    case FETCH_ACCEPT_PAYMENT_USERS:
      return {
        ...state,
        acceptPaymentUsers: [...action.data.data],
      };

    case FETCH_MASTER_LIST:
      return {
        ...state,
        masterList: [...action.data.data],
      };
    case FETCH_OPERATOR_LIST:
      return {
        ...state,
        operatorList: [...action.data.data],
      };

    default:
      return state;
  }
}
