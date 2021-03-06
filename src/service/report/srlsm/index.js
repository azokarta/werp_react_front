import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4fetchCategory,
  f4FetchBranches,
  f4FetchServiceAppStatus,
  f4FetchCountryList,
  f4FetchServiceStatusList,
} from '../../../reference/f4/f4_action';
import {
  fetchSrlsm,
  clearSrlsm,
  fetchServiceTypeList,
  fetchAcceptPaymentUsers,
  fetchMasterList,
  fetchOperatorList,
} from './srlsmAction';
import { injectIntl } from 'react-intl';
import {
  Container,
  Segment,
  Form,
  Table,
  Input,
  Dropdown,
  Modal,
  Button,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalColumns from './../../../utils/ModalColumns';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
  moneyFormat,
} from '../../../utils/helpers';
import '../../service.css';
import { LinkToSmcuspor, LinkToSmesManager } from '../../../utils/outlink';
import ReactTableServerSideWrapperFilteredState from '../../../utils/ReactTableServerSideWrapperFilteredState';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import TotalCountsTable from '../../../utils/TotalCountsTable';

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import moment from 'moment';
require('moment/locale/ru');

const Srlsm = props => {
  const {
    intl: { messages },
    language,
    category = [],
    companyOptions = [],
    branchOptionsService,
    serviceStatusList = [],
    //serviceType = [],
    srlsmListData = {},
    srlsmListSum = {},
    premiumSum = [],
    serviceTypeList = [],
    srlsmTotalPages,
    countryList = [],
    acceptPaymentUsers = [],
    masterList = [],
    operatorList = [],
  } = props;

  const emptyParam = {
    countryId: null,
    bukrs: null,
    branchId: '',
    categoryId: null,
    serviceTypeId: null,
    serviceStatusId: '1,4',
    masterId: null,
    operatorId: null,
    acceptedPaymentById: null,
    dateAt: momentToStringYYYYMMDD(moment(new Date())),
    dateTo: null,
  };

  const [param, setParam] = useState({ ...emptyParam });

  const [error, setError] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);

  const [modalDetails, setModalDetails] = useState(false);
  const [tablePage, setTablePage] = useState(0);

  const masterOptions = masterList.map((item, index) => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  const operatorOptions = operatorList.map((item, index) => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  useEffect(() => {
    props.f4fetchCategory();
    props.f4FetchBranches();
    props.f4FetchServiceStatusList();
    props.fetchServiceTypeList();
    props.f4FetchCountryList();
  }, []);

  useEffect(() => {
    if (param.bukrs && param.branchId) {
      let params = {
        bukrs: param.bukrs,
        branchId: param.branchId,
        categoryId: param.categoryId,
      };
      let paramsAcceptPay = {
        bukrs: param.bukrs,
        branchId: param.branchId,
      };
      props.fetchAcceptPaymentUsers({ ...paramsAcceptPay });
      props.fetchMasterList({ ...params });
      props.fetchOperatorList({ ...params });
    }
  }, [param.bukrs, param.branchId, param.categoryId]);

  const countryOptions = countryList.map(item => {
    return {
      key: item.countryId,
      text: item.country,
      value: item.countryId,
    };
  });

  const tovarCategoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const serviceStatusListOptions = serviceStatusList
    .filter(
      item =>
        parseInt(item.id) == 1 ||
        parseInt(item.id) == 4 ||
        parseInt(item.id) == 6,
    )
    .map(item => {
      return {
        key: parseInt(item.id),
        text: item.name,
        value: parseInt(item.id),
      };
    });

  const serviceTypeOptions = serviceTypeList.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const acceptUsersOptions = acceptPaymentUsers.map((item, index) => {
    return {
      key: parseInt(item.userId) * index,
      text: item.username,
      value: item.userId,
    };
  });

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const varSrls = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varSrls.countryId = o.value;
          break;
        case 'bukrs':
          varSrls.bukrs = o.value;
          varSrls.branchId = '';
          varSrls.categoryId = '';
          varSrls.serviceTypeId = '';
          varSrls.masterId = '';
          varSrls.operatorId = '';
          break;
        case 'acceptPayment':
          varSrls.acceptedPaymentById = o.value;

          break;
        case 'branchId':
          varSrls.branchId = o.value.length > 0 ? o.value.join() : null;
          varSrls.categoryId = '';
          varSrls.serviceTypeId = '';
          varSrls.masterId = '';
          varSrls.operatorId = '';
          break;
        case 'categoryId':
          varSrls.categoryId = o.value.length > 0 ? o.value.join() : null;
          varSrls.masterId = '';
          varSrls.operatorId = '';
          break;
        case 'serviceTypeId':
          varSrls.serviceTypeId = o.value.length > 0 ? o.value.join() : null;

          varSrls.masterId = '';
          varSrls.operatorId = '';
          break;
        case 'serviceStatusId':
          // varSrls.serviceStatusId = o.value;
          varSrls.serviceStatusId = o.value.length > 0 ? o.value.join() : null;
          break;
        case 'changeMaster':
          varSrls.masterId = o.value.length > 0 ? o.value.join() : null;
          break;
        case 'changeOperator':
          varSrls.operatorId = o.value.length > 0 ? o.value.join() : null;
          break;
        default:
          varSrls[fieldName] = o.value;
      }
      return varSrls;
    });
  };

  //Колонки ReactTable
  const initialColumns = [
    {
      Header: '#',
      accessor: 'serviceNumber',
      checked: true,
      filterable: false,
      width: 70,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {messages['L__BRANCH']}
        </div>
      ),
      accessor: 'branchName',
      checked: true,
      filterable: false,
      minWidth: 100,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {messages['Service_date']}
        </div>
      ),
      accessor: 'dateOpen',
      Cell: row => (
        <div className="flexCenter">
          {row.value ? moment(row.value).format('DD.MM.YYYY') : ''}
        </div>
      ),
      checked: true,
      filterable: false,
      width: 120,
    },
    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          CN
        </div>
      ),
      accessor: 'contractNumber',
      checked: true,
      minWidth: 100,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      Filter: ({ filter, onChange }) => {
        return (
          <input
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                //setTurnOnReactFetch(true);
                onChange(event.target.value);
              }
            }}
          />
        );
      },
    },
    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {messages['productSerialNumber']}
        </div>
      ),
      accessor: 'tovarSn',
      checked: true,
      minWidth: 120,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      Filter: ({ filter, onChange }) => {
        return (
          <input
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                // setTurnOnReactFetch(true);
                onChange(event.target.value);
              }
            }}
          />
        );
      },
    },
    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {messages['full_name_of_client']}
        </div>
      ),
      accessor: 'customerFIO',
      checked: true,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      Filter: ({ filter, onChange }) => {
        return (
          <input
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                // setTurnOnReactFetch(true);
                onChange(event.target.value);
              }
            }}
          />
        );
      },
      minWidth: 200,
    },

    {
      Header: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {messages['service_status']}
        </div>
      ),
      accessor: 'serviceStatusName',
      checked: true,
      filterable: false,
      width: 90,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['master'],
      accessor: 'masterFIO',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 150,
    },
    {
      Header: messages['Operator'],
      accessor: 'operatorFIO',
      checked: true,
      filterable: false,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 150,
    },
    // {
    //   Header: 'Вид сервиса',
    //   accessor: 'serviceTypeName',
    //   checked: true,
    //   filterable: false,
    //   Cell: row => (
    //     <div className="text-wrap" style={{ textAlign: 'center' }}>
    //       {row.value}
    //     </div>
    //   ),
    // },
    {
      Header: messages['amount'],
      accessor: 'sumTotal',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          {moneyFormat(original.row.sumTotal)}
        </div>
      ),
      width: 90,
    },
    {
      Header: messages['paid'],
      accessor: 'paid',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          {moneyFormat(original.row.paid)}
        </div>
      ),
      width: 90,
    },
    {
      Header: messages['remainder'],
      accessor: 'residue',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          {moneyFormat(original.row.residue)}
        </div>
      ),
      width: 90,
    },
    {
      Header: messages['waers'],
      accessor: 'currencyId',
      checked: true,
      filterable: false,
      width: 70,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },

    {
      Header: messages['Accepted'],
      accessor: 'acceptPaymentByName',
      checked: true,
      filterable: false,
      width: 90,
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },

    {
      Header: `${messages['service']} №`,
      accessor: 'serviceNumber',
      show: true,
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmesManager serviceNumber={row.value} />
        </div>
      ),

      Filter: ({ filter, onChange }) => {
        return (
          <input
            onKeyPress={event => {
              if (event.keyCode === 13 || event.which === 13) {
                //setTurnOnReactFetch(true);
                onChange(event.target.value);
              }
            }}
          />
        );
      },
      fixed: 'right',
      width: 100,
    },
    {
      Header: '',
      accessor: '16',
      filterable: false,
      Cell: original =>
        original.row.contractNumber ? (
          <div style={{ textAlign: 'center' }}>
            <LinkToSmcuspor
              contractNumber={original.row.contractNumber}
              text="Просмотр"
            />
          </div>
        ) : (
          ''
        ),
      checked: true,
      fixed: 'right',
      width: 50,
    },
  ];

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  const initialServerSideParams = {
    page: 0,
    size: 20,
    orderBy: 'serviceNumber',
    direction: 'DESC',
  };

  const [serverSideParams, setServerSideParams] = useState({
    ...initialServerSideParams,
  });

  const [filtered, setFiltered] = useState([]);

  const detailColumns = [
    {
      Header: messages['typeOfService'],
      accessor: 'serviceTypeName',

      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['master_award'],
      accessor: 'masterPremium',

      Footer: info => {
        let total = info.data.reduce(
          (total, item) => total + item.masterPremium,
          0,
        );

        console.log('INFO', info);
        console.log('total', total);

        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {`${messages['overallSum']}: ${moneyFormat(total)}`}
          </div>
        );
      },
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },
    {
      Header: messages['operator_award'],
      accessor: 'operatorPremium',
      Footer: info => {
        let total = info.data.reduce(
          (total, item) => total + item.operatorPremium,
          0,
        );

        console.log('INFO', info);
        console.log('total', total);

        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {`${messages['overallSum']}: ${moneyFormat(total)}`}
          </div>
        );
      },
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },
    {
      Header: messages['discount'],
      accessor: 'discount',
      Footer: info => {
        let total = info.data.reduce((total, item) => total + item.discount, 0);

        console.log('INFO', info);
        console.log('total', total);

        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {`${messages['overallSum']}: ${moneyFormat(total)}`}
          </div>
        );
      },
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },
    {
      Header: messages['Table.Amount'],
      accessor: 'serviceCount',
      Footer: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {`${messages['overallSum']}: ${
            srlsmListData.totalElements ? srlsmListData.totalElements : 0
          }`}
        </div>
      ),
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
      width: 90,
    },

    {
      Header: messages['Total_amount_discounted'],
      accessor: 'totalSumWithDiscount',
      Footer: info => {
        let total = info.data.reduce(
          (total, item) => total + item.totalSumWithDiscount,
          0,
        );

        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {`${messages['overallSum']}: ${moneyFormat(total)}`}
          </div>
        );
      },
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {moneyFormat(row.value)}
        </div>
      ),
    },
  ];

  const handleClickApply = () => {
    if (param.bukrs) {
      props.clearSrlsm();
      setFiltered([]);
      setTurnOnReactFetch(false);
      props.fetchSrlsm({ ...param, ...initialServerSideParams }, () =>
        setTurnOnReactFetch(true),
      );
      setServerSideParams({
        ...initialServerSideParams,
      });
      setError([]);
    } else {
      const errors = [];
      errors.push(errorTableText(5));
      setError(() => errors);
    }
  };
  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Segment>
        <h3>{`${messages['Services_list']} (${messages['Manager']})`}</h3>
      </Segment>
      <Modal
        onClose={() => setModalDetails(false)}
        open={modalDetails}
        closeIcon
        size="large"
      >
        <Modal.Header>{messages['Detailed_view']}</Modal.Header>
        <Modal.Content>
          <ReactTableWrapper
            data={premiumSum}
            columns={detailColumns}
            pageSize={8}
            showPagination
          />
        </Modal.Content>
      </Modal>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>{messages['country']}</label>
            <DropdownClearable
              fluid
              placeholder={messages['country']}
              value={param.countryId}
              options={countryOptions}
              onChange={(e, o) => onInputChange(o, 'countryId')}
              className="alignBottom"
              handleClear={() => setParam({ ...param, countryId: '' })}
            />
          </Form.Field>

          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <DropdownClearable
              fluid
              placeholder={messages['bukrs']}
              value={param.bukrs}
              options={companyOptions}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              className="alignBottom"
              handleClear={() => setParam({ ...param, bukrs: '' })}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['L__BRANCH']}</label>
            <Dropdown
              selection
              fluid
              placeholder={messages['L__BRANCH']}
              options={
                param.bukrs == '' || param.bukrs == null
                  ? []
                  : branchOptionsService[param.bukrs]
              }
              onChange={(e, o) => onInputChange(o, 'branchId')}
              className="alignBottom"
              multiple
              value={
                param.branchId ? param.branchId.split(',').map(Number) : []
              }
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['typeOfService']}</label>
            <Form.Select
              fluid
              placeholder={messages['typeOfService']}
              options={serviceTypeOptions}
              onChange={(e, o) => onInputChange(o, 'serviceTypeId')}
              className="alignBottom"
              multiple
              value={
                param.serviceTypeId
                  ? param.serviceTypeId.split(',').map(Number)
                  : []
              }
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['product_category']}</label>
            <Form.Select
              fluid
              placeholder={messages['product_category']}
              options={tovarCategoryOptions}
              onChange={(e, o) => onInputChange(o, 'categoryId')}
              className="alignBottom"
              multiple
              value={
                param.categoryId ? param.categoryId.split(',').map(Number) : []
              }
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['service_status']}</label>
            <Form.Select
              clearable="true"
              selection
              fluid
              multiple
              value={
                param.serviceStatusId
                  ? param.serviceStatusId.split(',').map(Number)
                  : []
              }
              options={serviceStatusListOptions}
              placeholder={messages['service_status']}
              onChange={(e, o) => onInputChange(o, 'serviceStatusId')}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['accepted_by_the_author']}</label>
            <DropdownClearable
              fluid
              placeholder={messages['accepted_by_the_author']}
              value={param.acceptedPaymentById}
              options={acceptUsersOptions}
              onChange={(e, o) => onInputChange(o, 'acceptPayment')}
              className="alignBottom"
              handleClear={() =>
                setParam({ ...param, acceptedPaymentById: '' })
              }
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                placeholderText={messages['Form.DateFrom']}
                isClearable
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateAt === null
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateAt: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>

            <Form.Field className="marginRight">
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                placeholderText={messages['Form.DateTo']}
                isClearable
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateTo === null
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateTo)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateTo: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Field className="marginRight width25Rem">
              <label>{messages['master']}</label>
              <Form.Select
                clearable="true"
                selection
                fluid
                multiple
                options={masterOptions}
                placeholder={messages['master']}
                onChange={(e, o) => onInputChange(o, 'changeMaster')}
                value={
                  param.masterId ? param.masterId.split(',').map(Number) : []
                }
              />
            </Form.Field>
            <Form.Field className="marginRight width25Rem">
              <label>{messages['Operator']}</label>
              <Form.Select
                clearable="true"
                selection
                fluid
                multiple
                options={operatorOptions}
                placeholder={messages['Operator']}
                onChange={(e, o) => onInputChange(o, 'changeOperator')}
                value={
                  param.operatorId
                    ? param.operatorId.split(',').map(Number)
                    : []
                }
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              {messages['apply']}
            </Form.Button>
          </div>

          <Form.Field className="alignBottom">
            <Button onClick={() => setModalDetails(true)} color="orange">
              {messages['in_detail']}
            </Button>
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <OutputErrors errors={error} />

      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{messages['Total_amount_discounted']}</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.sumTotal
                    ? srlsmListSum.sumTotal - srlsmListSum.discount
                    : '',
                )}
              />
            </Table.Cell>
            <Table.Cell>{messages['paid']}</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.paid === undefined || srlsmListSum.paid === null
                    ? ''
                    : srlsmListSum.paid,
                )}
              />
            </Table.Cell>
            <Table.Cell>{messages['remainder']}</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.paymentDue === null ||
                    srlsmListSum.paymentDue === undefined
                    ? ''
                    : srlsmListSum.paymentDue,
                )}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['master_award']}</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.masterPremium === null ||
                    srlsmListSum.masterPremium === undefined
                    ? ''
                    : srlsmListSum.masterPremium,
                )}
              />
            </Table.Cell>
            <Table.Cell>{messages['operator_award']}</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.operatorPremium === null ||
                    srlsmListSum.operatorPremium === undefined
                    ? ''
                    : srlsmListSum.operatorPremium,
                )}
              />
            </Table.Cell>
            <Table.Cell>{messages['discount']}</Table.Cell>
            <Table.Cell>
              <Input
                readOnly
                value={moneyFormat(
                  srlsmListSum.discount ? srlsmListSum.discount : '',
                )}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <TotalCountsTable
        text={messages['overallAmount']}
        count={srlsmListData.totalElements}
      />

      <ReactTableServerSideWrapperFilteredState
        data={srlsmListData.data}
        columns={columns}
        filterable={true}
        showPagination={true}
        pageSize={serverSideParams.size}
        requestData={params => {
          setServerSideParams({ ...params });
          props.fetchSrlsm(
            {
              ...param,
              ...params,
              orderBy: params.orderBy
                ? params.orderBy
                : serverSideParams.orderBy,
              direction: params.direction
                ? params.direction
                : serverSideParams.direction,
            },
            () => setTurnOnReactFetch(true),
          );
        }}
        pages={srlsmTotalPages ? srlsmTotalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
        page={serverSideParams.page}
        filtered={filtered}
        onFilteredChange={filter => {
          setFiltered(filter);
        }}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    countryList: state.f4.countryList,
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    category: state.f4.category,
    branchOptionsService: state.userInfo.branchOptionsService,
    contractStatusList: state.f4.contractStatusList,
    serviceTypeList: state.srlsmReducer.serviceTypeList,
    srlsmListData: state.srlsmReducer.srlsmListData,
    srlsmListSum: state.srlsmReducer.srlsmListSum,
    premiumSum: state.srlsmReducer.premiumSum,
    masterList: state.srlsmReducer.masterList,
    operatorList: state.srlsmReducer.operatorList,
    srlsmTotalPages: state.srlsmReducer.srlsmTotalPages,
    acceptPaymentUsers: state.srlsmReducer.acceptPaymentUsers,
    serviceStatusList: state.f4.serviceStatusList,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchBranches,
  f4FetchServiceAppStatus,
  fetchSrlsm,
  clearSrlsm,
  fetchServiceTypeList,
  f4FetchCountryList,
  f4FetchServiceStatusList,
  fetchAcceptPaymentUsers,
  fetchMasterList,
  fetchOperatorList,
})(injectIntl(Srlsm));
