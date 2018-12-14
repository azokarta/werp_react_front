import axios from 'axios';
import { ROOT_URL } from '../../../utils/constants';
import { modifyLoader } from '../../../general/loader/loader_action';
import { handleError } from '../../../general/notification/notification_action';

import {
  LOG_WERKS_REQUEST_LIST_FETCHED,
  LOG_WERKS_REQUEST_BLANKED,
  LOG_MATNRS_FETCHED,
  LOG_MATNRS_LOADING,
  LOG_WERKS_REQUEST_ITEM_BLANKED,
  LOG_WERKS_REQUEST_FETCHED,
} from './logisticsActionTypes';

export function fetchWerksRequestsByStatus(status) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/logistics/werks-request/by-status/${status}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: LOG_WERKS_REQUEST_LIST_FETCHED,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function blankWerksRequest() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/logistics/werks-request/blank`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: LOG_WERKS_REQUEST_BLANKED,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function fetchWerksRequest(id) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/logistics/werks-request/` + id, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: LOG_WERKS_REQUEST_FETCHED,
          payload: data,
        });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
}

export function blankWerksRequestItem(matnrId) {
  return dispatch => {
    return axios.get(
      `${ROOT_URL}/api/logistics/werks-request/blank-item/` + matnrId,
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      },
    );
  };
}

export function createWerksRequest(o) {
  return dispatch => {
    return axios.post(`${ROOT_URL}/api/logistics/werks-request`, o, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  };
}

export function fetchMatnrs(params) {
  return function(dispatch) {
    dispatch(setMatnrListLoading(true));
    axios
      .get(`${ROOT_URL}/api/reference/matnrs`, {
        params: params,
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch(setMatnrListLoading(false));
        dispatch({
          type: LOG_MATNRS_FETCHED,
          payload: data,
        });
      })
      .catch(error => {
        dispatch(setMatnrListLoading(false));
        handleError(error, dispatch);
      });
  };
}

export function setMatnrListLoading(flag) {
  return {
    type: LOG_MATNRS_LOADING,
    payload: flag,
  };
}
