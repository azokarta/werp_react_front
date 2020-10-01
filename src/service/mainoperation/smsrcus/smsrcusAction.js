import { doGet } from '../../../utils/apiActions';
import {
  handleError,
  //notify,
} from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

//План по замене картриджей
export const FETCH_SMSRCUS_LIST = 'FETCH_SMSRCUS_LIST';
export const CLEAR_SMSRCUS_LIST = 'CLEAR_SMSRCUS_LIST';

// const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
// const language = localStorage.getItem('language');

//План по замене картриджей
export const fetchSmsrcusList = (param, setFunc) => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smsrcus/list`, param)
      .then(({ data }) => {
        setFunc();
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SMSRCUS_LIST,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export function clearSmsrcusList() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_SMSRCUS_LIST,
    });
  };
}
