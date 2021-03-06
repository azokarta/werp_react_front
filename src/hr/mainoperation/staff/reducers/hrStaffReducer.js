import {
  HR_STAFF_CURRENT_STAFFS,
  HR_STAFF_CLEAR_STATE,
  HR_STAFF_SINGLE_STAFF,
  HR_STAFF_FETCH_STAFF_SALARIES,
  HR_STAFF_FETCH_STAFF_EXPENCES,
  HR_STAFF_LIST_MODAL_OPENED,
  HR_STAFF_ALL_CURRENT_STAFFS,
  HR_SALARY_FORM_MODAL_OPENED,
  HR_SALARY_CREATED,
  HR_PYRAMID_FETCH_BRANCH_PYRAMIDS,
  HR_PYRAMID_FETCH_PYRAMIDS,
  HR_SET_SALARY_FOR_UPDATE,
  HR_STAFF_FETCH_BLANK,
  HR_SALARY_UPDATED,
  HR_STAFF_DATA_FORM_MODAL_FLAG,
  HR_STAFF_DATA_BLANKED,
  HR_STAFF_DATA_CREATED,
  HR_STAFF_DATA_FETCHED_LIST,
  HR_STAFF_FETCH_MANAGERS,
  HR_STAFF_SET_STAFF_DATA_FOR_UPDATE,
  HR_STAFF_DATA_UPDATED,
  HR_STAFF_ALL_STAFFS,
  HR_STAFF_FETCH_DIRECTORS,
  HR_STAFF_FILE_UPLOADED,
  HR_STAFF_FILE_DELETED,
  HR_STAFF_MARITAL_STATUSES,
  HR_STAFF_MARITAL_STATUS_OPTIONS,
  HR_EXIT_INTERVIEWS,
} from '../actions/hrStaffAction';

import { FILE_DATA } from '../../../hrUtil';

const INITIAL_STATE = {
  currentStaffs: [],
  staff: {},
  allCurrentStaffs: [],
  staffSalaries: [],
  staffExpences: [],
  staffOffData: [],
  items: [],
  statuses: [],
  meta: {
    totalRows: 0,
    perPage: 0,
    page: 0,
  },
  staffListModalOpened: false,
  salaryFormModalOpened: false,
  salary: {},
  branchPyramids: [],
  pyramids: [],
  staffFormErrors: {},
  staffDataFormModalOpened: false,
  staffData: {},
  staffDataList: {},

  //
  managers: [],
  managersByBranchOptions: [],

  directors: [],
  directorsByBranchOptions: [],
  maritalStatuses: [],
  maritalStatusOptions: [],
  exitInterviews: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HR_STAFF_CURRENT_STAFFS:
      return { ...state, currentStaffs: action.items, meta: action.meta };

    case HR_STAFF_ALL_CURRENT_STAFFS:
      return { ...state, allCurrentStaffs: action.payload };

    case HR_STAFF_ALL_STAFFS:
      return { ...state, allStaffs: action.payload };

    case HR_STAFF_SINGLE_STAFF:
      return { ...state, staff: action.payload };

    case HR_STAFF_FETCH_BLANK:
      return { ...state, staff: action.payload };

    case HR_STAFF_FETCH_STAFF_SALARIES:
      return { ...state, staffSalaries: action.payload };

    case HR_STAFF_FETCH_STAFF_EXPENCES:
      return { ...state, staffExpences: action.payload };

    case HR_STAFF_LIST_MODAL_OPENED:
      return { ...state, staffListModalOpened: action.payload };

    case HR_SALARY_FORM_MODAL_OPENED:
      return { ...state, salaryFormModalOpened: action.payload };

    case HR_SALARY_CREATED:
      const salaries = [...state.staffSalaries];
      salaries.push(action.payload);
      return {
        ...state,
        staffSalaries: salaries,
        salaryFormModalOpened: false,
      };

    case HR_SALARY_UPDATED:
      const stfSalaries = [];
      const sal = action.payload;
      for (const k in state.staffSalaries) {
        if (state.staffSalaries[k].id === sal.id) {
          stfSalaries.push(sal);
        } else {
          stfSalaries.push(state.staffSalaries[k]);
        }
      }

      return {
        ...state,
        staffSalaries: stfSalaries,
        salaryFormModalOpened: false,
      };

    case HR_STAFF_CLEAR_STATE:
      return {
        ...state,
        doneItems: [],
        movedItems: [],
        newItems: [],
        usedItems: [],
      };

    case HR_PYRAMID_FETCH_BRANCH_PYRAMIDS:
      return { ...state, branchPyramids: action.payload };

    case HR_PYRAMID_FETCH_PYRAMIDS:
      return { ...state, pyramids: action.payload };

    case HR_SET_SALARY_FOR_UPDATE:
      return { ...state, salary: action.payload };

    case HR_STAFF_DATA_FORM_MODAL_FLAG:
      return { ...state, staffDataFormModalOpened: action.payload };

    case HR_STAFF_DATA_BLANKED:
      return { ...state, staffData: action.payload };

    case HR_STAFF_SET_STAFF_DATA_FOR_UPDATE:
      return { ...state, staffData: action.payload };

    case HR_STAFF_DATA_CREATED:
      const staffDataList = Object.assign({}, state.staffDataList);
      const tempData = staffDataList[action.activeData] || [];
      tempData.push(action.payload);
      staffDataList[action.activeData] = tempData;
      return { ...state, staffDataList, staffDataFormModalOpened: false };

    case HR_STAFF_DATA_UPDATED:
      const staffDataList1 = Object.assign({}, state.staffDataList);
      const tmpStfData = staffDataList1[action.activeData] || [];
      for (const k in tmpStfData) {
        if (tmpStfData[k].id === action.payload.id) {
          tmpStfData[k] = action.payload;
          break;
        }
      }

      staffDataList1[action.activeData] = tmpStfData;

      return {
        ...state,
        staffDataList: staffDataList1,
        staffDataFormModalOpened: false,
      };

    case HR_STAFF_DATA_FETCHED_LIST:
      const stfDataList = Object.assign({}, state.staffDataList);
      stfDataList[action.activeData] = action.payload;
      return { ...state, staffDataList: stfDataList };

    case HR_STAFF_FETCH_MANAGERS:
      const managersByBranch = {};
      for (const key in action.payload) {
        const current = action.payload[key];
        if (!managersByBranch[current.branchId]) {
          managersByBranch[current.branchId] = [];
        }

        managersByBranch[current.branchId].push({
          text: current.staffName,
          key: current.staffId,
          value: current.staffId,
        });
      }

      return {
        ...state,
        managers: action.payload,
        managersByBranchOptions: managersByBranch,
      };

    case HR_STAFF_FETCH_DIRECTORS:
      const directorsByBranch = {};
      for (const key in action.payload) {
        const current = action.payload[key];
        if (!directorsByBranch[current.branchId]) {
          directorsByBranch[current.branchId] = [];
        }

        directorsByBranch[current.branchId].push({
          text: current.staffName,
          key: current.staffId,
          value: current.staffId,
        });
      }

      return {
        ...state,
        directors: action.payload,
        directorsByBranchOptions: directorsByBranch,
      };

    case HR_STAFF_FILE_UPLOADED:
      const stfDataList1 = Object.assign({}, state.staffDataList);
      if (!stfDataList1[FILE_DATA]) {
        stfDataList1[FILE_DATA] = [];
      }

      stfDataList1[FILE_DATA].push(action.payload);
      return { ...state, staffDataList: stfDataList1 };

    case HR_STAFF_FILE_DELETED:
      const stfDataList2 = Object.assign({}, state.staffDataList);

      const newStfDataList2 = [];
      for (const kk in stfDataList2[FILE_DATA]) {
        if (
          parseInt(stfDataList2[FILE_DATA][kk].id, 10) ===
          parseInt(action.payload, 10)
        ) {
          continue;
        }

        newStfDataList2.push(stfDataList2[FILE_DATA][kk]);
      }

      stfDataList2[FILE_DATA] = newStfDataList2;
      return { ...state, staffDataList: stfDataList2 };

    case HR_STAFF_MARITAL_STATUSES:
      return { ...state, maritalStatuses: action.payload };

    case HR_STAFF_MARITAL_STATUS_OPTIONS:
      return { ...state, maritalStatusOptions: action.payload };

    case HR_EXIT_INTERVIEWS:
      return { ...state, exitInterviews: action.payload };

    default:
      return state;
  }
}
