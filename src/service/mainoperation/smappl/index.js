import React, { useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Divider,
  Button,
  Form,
  Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import OutputErrors from '../../../general/error/outputErrors';
import {
  clearDynObjService,
  fetchAppStatus,
  fetchAppType,
  fetchAppList,
  fetchAppMasterList,
  fetchClearAppList,
  fetchAppListSearchParam,
} from '../../serviceAction';

import { f4fetchCategory } from '../../../reference/f4/f4_action';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDMY, errorTableText } from '../../../utils/helpers';
import ColumnsModal from '../../../utils/ColumnsModal';
import './index.css';
import ServiceRequestTable from './table';
import {
  LinkToSmcuspor,
  LinkToSmecam,
  LinkToSmvs,
  LinkToSmcsEmpty,
  LinkToSmcsWithRequest,
  LinkToSmccald,
} from '../../../utils/outlink';
import Masters from './Masters';

import TotalCountsTable from '../../../utils/TotalCountsTable';

const Smappl = props => {
  const {
    companyPosition = [],
    intl: { messages },
    branchOptions,
    fetchAppStatus,
    appStatus,
    fetchAppType,
    appType,
    fetchAppList,
    fetchAppMasterList,
    fetchClearAppList,
    fetchAppListSearchParam,
    category,
    appList,
  } = props;

  const [error, setError] = useState([]);
  const language = localStorage.getItem('language');
  const [applicationStatus, setApplicationStatus] = useState([]);
  const [applicationType, setApplicationType] = useState([]);
  const [aDateFrom, setDateFrom] = useState();
  const [aDateTo, setDateTo] = useState();
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [search, setSearch] = useState({
    bukrs: '',
    branchId: 0,
    aDateFrom: null,
    aDateTo: null,
    tovarCategorys: null,
    appStatusIds: null,
    appTypeIds: null,
    page: 0,
  });

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const allColumns = [
    {
      Header: `id`,
      accessor: 'id',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: `CN `,
      accessor: 'contractNumber',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['productSerialNumber'],
      accessor: 'tovarSn',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['TBL_H__PRODUCT'],
      accessor: 'matnrName',
      show: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Application_Date'],
      accessor: 'adate',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Form.Reco.RecoName'],
      accessor: 'applicantName',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Table.Address'],
      accessor: 'address',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Phone'],
      accessor: 'fullPhone',
      show: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Masters'],
      accessor: 'masterName',
      show: true,
      Cell: ({ row }) => (
        <div style={{ textAlign: 'center' }}>
          {row._original.masterName}
          <Masters
            master={row._original.masterName}
            id={row._original.masterId}
            request={row._original}
          />
        </div>
      ),
    },
    {
      Header: messages['L__ORDER_STATUS'],
      accessor: 'appStatusName',
      show: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Operator'],
      accessor: 'operatorName',
      show: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['type_of_application'],
      accessor: 'appTypeName',
      show: true,
      filterable: false,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: `№ ${messages['Applications']}`,
      accessor: 'id',
      show: true,
      filterable: false,
      Cell: ({ row }) => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmecam id={row._original.id} />
        </div>
      ),
    },
    {
      Header: `${messages['service']} №`,

      accessor: 'id',
      Footer: original => {
        let total = 0;
        original.data.map((item, index) => {
          if (
            item._original.serviceTotalSum != null ||
            item._original.serviceTotalSum != undefined
          ) {
            total = total + item._original.serviceTotalSum;
          }
        });
        return <div style={{ textAlign: 'center' }}>Итого:{total}</div>;
      },
      show: true,
      filterable: false,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmvs serviceNumber={row.value} />
        </div>
      ),
    },
    {
      Header: messages['customer_story'],
      accessor: 'clientStory',
      show: true,
      filterable: false,
      Cell: ({ row }) => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor contractNumber={row._original.contractNumber} />
        </div>
      ),
    },
  ];
  const [columnsForTable, setColumnsForTable] = useState([]);

  useEffect(() => {
    fetchClearAppList();
    fetchAppStatus();
    fetchAppType();
    props.f4fetchCategory();
  }, []);

  useEffect(() => {
    const transactionCodeText = localStorage.getItem('smappl');
    if (transactionCodeText) {
      let transactionCodeObject = JSON.parse(transactionCodeText);

      let temp = allColumns.map(item => {
        return { ...item, show: transactionCodeObject[item.accessor] };
      });
      setColumnsForTable(temp);
    } else {
      setColumnsForTable(allColumns);
    }
  }, []);

  useEffect(() => {
    const app = appStatus.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });
    setApplicationStatus(app);
  }, [appStatus]);

  useEffect(() => {
    const app = appType.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });
    setApplicationType(app);
  }, [appType]);

  const onChange = (text, value) => {
    setSearch(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          varTs.bukrs = value;
          varTs.branchId = 0;
          break;
        case 'branch':
          varTs.branchId = value;
          break;
        case 'datefrom':
          setDateFrom(value);
          varTs.aDateFrom = formatDMY(value) || null;
          break;
        case 'dateTo':
          setDateTo(value);
          varTs.aDateTo = formatDMY(value) || null;
          break;
        case 'product':
          varTs.tovarCategorys = value.length > 0 ? value.join() : null;
          break;
        case 'status':
          varTs.appStatusIds = value.length > 0 ? value.join() : null;
          break;
        case 'ApplicationType':
          varTs.appTypeIds = value.length > 0 ? value.join() : null;
          break;
        default:
          return varTs;
      }
      return varTs;
    });
  };
  const onSearch = () => {
    const errors = [];
    if (search.bukrs === '') {
      errors.push(errorTableText(5));
    }
    if (search.branchId === 0) {
      errors.push(errorTableText(7));
    }
    if (errors.length === 0) {
      fetchAppList(search);
      fetchAppMasterList(search);
      setTurnOnReactFetch(true);
      fetchAppListSearchParam(search);
    }
    setError(() => errors);
  };

  return (
    <Segment>
      <Divider hidden></Divider>
      <Segment>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>{messages['service_requests']}</h3>
          {/* <LinkToSmccald buttonName="Создать заявку без данных" /> */}
          <LinkToSmcsEmpty />
        </div>
      </Segment>

      <Divider />

      <Form>
        <Form.Group widths="equal">
          <Form.Select
            label={messages['bukrs']}
            clearable="true"
            selection
            options={companyPosition}
            placeholder={messages['bukrs']}
            onChange={(e, { value }) => onChange('bukrs', value)}
            required
          />
          <Form.Select
            label={messages['Task.Branch']}
            clearable="true"
            selection
            options={search.bukrs ? branchOptions[search.bukrs] : []}
            placeholder={messages['Task.Branch']}
            onChange={(e, { value }) => onChange('branch', value)}
            required
          />
          <Form.Select
            label={messages['product_category']}
            clearable="true"
            multiple
            selection
            options={categoryOptions}
            placeholder={messages['product_category']}
            onChange={(e, { value }) => onChange('product', value)}
          />
          <Form.Select
            label={messages['L__ORDER_STATUS']}
            clearable="true"
            selection
            multiple
            options={applicationStatus}
            placeholder={messages['L__ORDER_STATUS']}
            onChange={(e, { value }) => onChange('status', value)}
          />
          <Form.Select
            label={messages['type_of_application']}
            clearable="true"
            selection
            multiple
            options={applicationType}
            placeholder={messages['type_of_application']}
            onChange={(e, { value }) => onChange('ApplicationType', value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Field>
            <label>{messages['Form.DateFrom']}</label>
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale={language}
              selected={aDateFrom}
              onChange={event => onChange('datefrom', event)}
              dateFormat="DD.MM.YYYY"
              placeholderText={messages['Form.DateFrom']}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['Form.DateTo']}</label>
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              selected={aDateTo}
              locale={language}
              onChange={event => onChange('dateTo', event)}
              dateFormat="DD.MM.YYYY"
              placeholderText={messages['Form.DateTo']}
            />
          </Form.Field>

          <Form.Field
            control={Button}
            color="blue"
            style={{ marginTop: 24 }}
            onClick={onSearch}
          >
            <Icon name="search" />
            {messages['search']}
          </Form.Field>
        </Form.Group>
      </Form>

      <OutputErrors errors={error} />

      <Divider></Divider>

      <Segment basic textAlign="right">
        <ColumnsModal
          tableHeaderCols={columnsForTable}
          tableThings={things => {
            setColumnsForTable(things);
            //store in localstorage
            let temp = {};
            things.map(el => {
              temp = { ...temp, [el.accessor]: el.show };
            });
            localStorage.setItem('smappl', JSON.stringify(temp));
          }}
        />
      </Segment>
      <TotalCountsTable count={appList.totalElements} />
      <ServiceRequestTable
        turnOnReactFetch={turnOnReactFetch}
        searchParams={search}
        tableCols={columnsForTable}
      />
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    state,
    appList: state.serviceReducer.appList,
    companyPosition: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsService,
    appStatus: state.serviceReducer.appStatus,
    appType: state.serviceReducer.appType,
    appMasterList: state.serviceReducer.appMasterList,
    category: state.f4.category,
  };
};

export default connect(mapStateToProps, {
  clearDynObjService,
  fetchAppStatus,
  fetchAppType,
  fetchAppList,
  fetchAppMasterList,
  fetchClearAppList,
  fetchAppListSearchParam,
  f4fetchCategory,
})(injectIntl(Smappl));
