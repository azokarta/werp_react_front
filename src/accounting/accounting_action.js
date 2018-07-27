import axios from 'axios';
import {ROOT_URL} from '../utils/constants';
import { handleError, notify } from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';
import {clearfaBkpf} from '../finance/fa_action';

export const FETCH_AMCDD = 'FETCH_AMCDD';
export const CLEAR_AMCDD = 'CLEAR_AMCDD';
export const CHANGE_AMCDD = 'CHANGE_AMCDD';

export const FETCH_DYNOBJ_ACC = 'FETCH_DYNOBJ_ACC';
export const CHANGE_DYNOBJ_ACC = 'CHANGE_DYNOBJ_ACC';
export const CLEAR_DYNOBJ_ACC = 'CLEAR_DYNOBJ_ACC';


export function amsgSave(a_bkpf, a_rows, a_rowsPs, a_lifnr) {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        
        axios.post(`${ROOT_URL}/api/accounting/mainoperation/amsg/save`,
            {
            
                bkpf:a_bkpf,
                l_bseg:a_rows,
                l_payment_schedule:a_rowsPs,
                lifnr: a_lifnr

            },       
            {            
                headers: 
                {                            
                    // 'Content-Type': 'application/json;charset=UTF-8',
                    authorization: localStorage.getItem('token')
                }
            }        
        ) 
        
        .then(({data}) => {
            dispatch(modifyLoader(false));
            if(data)
            {
                dispatch(notify('success','Сохранен.','Успешно'));
                dispatch(clearfaBkpf());
            }
            else
            {
                dispatch(notify('info','Не сохранен.','Ошибка'));
            }
                
        })
        .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error,dispatch); 
        });
    }    


}

export function amcddSave(a_contract) {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        
        axios.post(`${ROOT_URL}/api/accounting/mainoperation/amcdd/save`,
            {           
                ...a_contract
            },       
            {            
                headers: 
                {                            
                    // 'Content-Type': 'application/json;charset=UTF-8',
                    authorization: localStorage.getItem('token')
                }
            }        
        ) 
        
        .then(({data}) => {
            dispatch(modifyLoader(false));
            if(data)
            {
                dispatch(notify('success','Сохранен.','Успешно'));
                dispatch(amcddFetch(a_contract.zregOrConNum));
            }
            else
            {
                dispatch(notify('info','Не сохранен.','Ошибка'));
            }
                
        })
        .catch(error => {
            dispatch(modifyLoader(false));
            handleError(error,dispatch); 
        });
    }    


}

export function amcddFetch(a_zregOrConNum) {
    
    
    return function(dispatch) {
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/accounting/mainoperation/amcdd/fetch`, {
            headers: 
            {
                authorization: localStorage.getItem('token')
            },
            params:
            {
                zregOrConNum: a_zregOrConNum
            }
        })
        .then(({data}) => {
            
            dispatch(modifyLoader(false));
            dispatch({
                type: FETCH_AMCDD,
                data:data
            });
    
        })
        .catch(error => {
            handleError(error,dispatch);
            dispatch(modifyLoader(false));
        });
    }


}
export function amcddChange(a_obj) {
    const obj = {
        type: CHANGE_AMCDD,
        data: a_obj
    };
    return obj;
}


export function amcddClear() {
    const obj = {
        type: CLEAR_AMCDD
    };
    return obj;
}


export function changeDynObjAcc(a_obj) {
    const obj = {
        type: CHANGE_DYNOBJ_ACC,
        data: a_obj
    };
    return obj;
}
export function clearDynObjAcc() {
    const obj = {
        type: CLEAR_DYNOBJ_ACC
    };
    return obj;
}

//ARLI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function fetchARLI(a_bukrs,a_branchList,a_dateFrom,a_dateTo, a_callBackFunc) {
    
    return function(dispatch) {
        dispatch(modifyLoader(true));
        axios.get(`${ROOT_URL}/api/accounting/reports/arli/fetch`, {
            headers: 
            {
                authorization: localStorage.getItem('token')
            },
            params:
            {
                bukrs: a_bukrs,
                branchList: a_branchList,
                dateFrom: a_dateFrom,
                dateTo: a_dateTo
            }
        })
        .then(({data}) => {
            
            dispatch(modifyLoader(false));
            dispatch({
                type: FETCH_DYNOBJ_ACC,
                data:data
            });
            a_callBackFunc(1);
    
        })
        .catch(error => {
            handleError(error,dispatch);
            dispatch(modifyLoader(false));
        });
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////