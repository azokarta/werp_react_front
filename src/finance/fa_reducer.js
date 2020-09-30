import {
  CHANGE_FA_BKPF,
  CLEAR_FA_BKPF,
  FETCH_CASHBANKHKONTS_BY_BRANCH,
  CLEAR_CASHBANKHKONTS_BY_BRANCH,
  FETCH_DYNOBJ_FI,
  CHANGE_DYNOBJ_FI,
  CLEAR_DYNOBJ_FI,
  FETCH_EXPENSEHKONTS_BY_BUKRS,
  CLEAR_EXPENSEHKONTS_BY_BUKRS,
  FETCH_WORK_ACCOUNTABLE_LIST,
  CLEAR_WORK_ACCOUNTABLE_LIST,
  FETCH_FOEA_OUTPUTTABLE,
  FETCH_FOEA_DETAILTABLE,
  CHANGE_FOEA_SEARCH_PARAMS,
  CLEAR_FOEA,
  CLEAR_FOEA_OUTPUTTABLE,
} from './fa_action';

const INITIAL_STATE = {
  faForm: {
    bkpf: {
      bukrs: '',
      brnch: '',
      business_area_id: '',
      dep: '',
      blart: '',
      waers: '',
      kursf: 0,
      bktxt: '',
      official: false,
      bldat: '',
      budat: '',
      zreg: '',
    },
    hkontOptions: [],
    hkontOptions2: [],
    initialBkpf: {
      bukrs: '',
      brnch: '',
      business_area_id: '',
      dep: '',
      blart: '',
      waers: '',
      kursf: 0,
      bktxt: '',
      official: false,
      bldat: '',
      budat: '',
      zreg: '',
    },
  },
  dynamicObject: {},
  workAccountableList: [],
  foea: {
    searchParams: {
      bukrs: '',
      bldatFrom: '',
      bldatTo: '',
      selectedBranches: [],
      selectedStatuses: [],
      selectedTypes: [],
    },
  },
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_FA_BKPF:
      return { ...state, faForm: { ...state.faForm, bkpf: action.bkpf } };
    case CLEAR_FA_BKPF:
      return {
        ...state,
        faForm: { ...state.faForm, bkpf: { ...state.faForm.initialBkpf } },
      };
    case FETCH_CASHBANKHKONTS_BY_BRANCH:
      return {
        ...state,
        faForm: { ...state.faForm, hkontOptions: action.hkontOptions },
      };
    case CLEAR_CASHBANKHKONTS_BY_BRANCH:
      return { ...state, faForm: { ...state.faForm, hkontOptions: [] } };
    case FETCH_EXPENSEHKONTS_BY_BUKRS:
      return {
        ...state,
        faForm: { ...state.faForm, hkontOptions2: action.hkontOptions },
      };
    case CLEAR_EXPENSEHKONTS_BY_BUKRS:
      return { ...state, faForm: { ...state.faForm, hkontOptions2: [] } };
    case FETCH_DYNOBJ_FI:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };
    case CHANGE_DYNOBJ_FI:
      return {
        ...state,
        dynamicObject: { ...state.dynamicObject, ...action.data },
      };
    case CLEAR_DYNOBJ_FI:
      return { ...state, dynamicObject: {} };

    case FETCH_WORK_ACCOUNTABLE_LIST:
      return { ...state, workAccountableList: action.data };
    case CLEAR_WORK_ACCOUNTABLE_LIST:
      return { ...state, workAccountableList: [] };

    case FETCH_FOEA_OUTPUTTABLE:
      return {
        ...state,
        foea: { ...state.foea, outputTable: action.data },
      };

    case FETCH_FOEA_DETAILTABLE:
      return {
        ...state,
        foea: { ...state.foea, detailTable: action.data },
      };

    case CLEAR_FOEA:
      return { ...state, foea: {} };

    case CHANGE_FOEA_SEARCH_PARAMS:
      return {
        ...state,
        foea: {
          ...state.foea,
          searchParams: { ...state.foea.searchParams, ...action.data },
          detailTable: [],
          outputTable: [],
        },
      };

    case CLEAR_FOEA_OUTPUTTABLE:
      return {
        ...state,
        foea: { ...state.foea, detailTable: [], outputTable: [] },
      };
    default:
      return state;
  }
}
