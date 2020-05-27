import { doGet } from '../../../utils/apiActions';
import { handleError } from '../../../general/notification/notification_action';
import { modifyLoader } from '../../../general/loader/loader_action';

export const FETCH_SRLSM = 'FETCH_SRLSM';
export const FETCH_SERVICE_TYPE_LIST = 'FETCH_SERVICE_TYPE_LIST';

const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
const language = localStorage.getItem('language');

//SRLS список сервисов
export const fetchSrlsm = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`srlsm`, param)
      .then(({ data }) => {
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SRLSM,
          data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};

export const fetchServiceTypeList = param => {
  return function(dispatch) {
    dispatch(modifyLoader(true));
    doGet(`smcs/getServiceTypeList`, param)
      .then(({ data }) => {
        //console.log(data, 'ACTION');
        dispatch(modifyLoader(false));
        dispatch({
          type: FETCH_SERVICE_TYPE_LIST,
          data: data,
        });
      })
      .catch(error => {
        dispatch(modifyLoader(false));
        handleError(error, dispatch);
      });
  };
};
