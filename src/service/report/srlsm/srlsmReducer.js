import { FETCH_SRLSM, FETCH_SERVICE_TYPE_LIST } from './srlsmAction';

const INITIAL_STATE = {
  dynamicObject: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SRLSM:
      console.log('REDUCE SRLSM', action.data.data);
      return {
        ...state,
        srlsmListData: { ...action.data.data.listData },
        srlsmListSum: { ...action.data.data.listSum },
        srlsmTotalPages: action.data.data.listData.totalPages,
      };
    case FETCH_SERVICE_TYPE_LIST:
      return {
        ...state,
        serviceTypeList: [...action.data.data],
      };

    default:
      return state;
  }
}
