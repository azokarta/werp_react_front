import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Form,
  Divider,
  Segment,
  Icon,
  Popup,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchAssignedCalls } from '../smopspAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import DatePicker from 'react-datepicker';
import TextAlignCenter from '../../../../utils/TextAlignCenter';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import ModalColumns from './../../../../utils/ModalColumns';
import { Link } from 'react-router-dom';
import DropdownClearable from '../../../../utils/DropdownClearable';

const AssignedCalls = props => {
  const {
    intl: { messages },
    language,
    assignedCalls = [],
    branchOptions = [],
    countryOptions,
    companyOptions = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    crmScheduleDateAt: momentToStringYYYYMMDD(moment(new Date())),
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (param.bukrs) {
      setServiceBranchOptions(branchOptions[param.bukrs]);
    }
    if (param.bukrs !== '' && param.countryId !== '' && branchOptions) {
      let brnchOpt = branchOptions[param.bukrs].filter(
        item => item.countryid === param.countryId,
      );
      setServiceBranchOptions(brnchOpt);
    }
  }, [branchOptions, param.countryId, param.bukrs]);

  const initialColumns = [
    {
      Header: '#',
      accessor: 'id',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 60,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchName',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 60,
    },

    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterable: false,
      width: 80,
    },
    {
      Header: messages['appointment_date'],
      accessor: 'crmScheduleDate',
      checked: true,
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterable: false,
      width: 80,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['address'],
      accessor: 'fullAddress',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: messages['Dealer.Fullname'],
      accessor: 'dealerFIO',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 40,
    },
    {
      Header: messages['guarantee'],
      accessor: 'warrantyId',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 85,
    },

    {
      Header: messages['category'],
      accessor: 'crmCategoryId',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
      width: 85,
    },

    {
      Header: messages['fin_status'],
      accessor: 'contractStatusId',
      checked: true,
      Cell: row => <TextAlignCenter text={row.value} />,
      filterable: false,
    },
    {
      Header: messages['description'],
      accessor: 'info',
      checked: true,
      filterable: false,
      Cell: row => (
        <Popup
          content={row.value}
          on="hover"
          pinned="true"
          trigger={<div style={{ textAlign: 'center' }}>{row.value}</div>}
        />
      ),
    },
    {
      Header: messages['Table.View'],
      accessor: '16',
      filterable: false,
      Cell: original => {
        const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}&filterVCId=${original.original.serviceFilterVCPlanId}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              <Icon name="address card" color="black" />
            </Link>
          </div>
        );
      },
      checked: true,
      width: 40,
      fixed: 'right',
    },
  ];

  const [serverSideParams, setServerSideParams] = useState({});

  const handleClickApply = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      const orderBy = 'id';
      const direction = 'DESC';
      if (Object.keys(serverSideParams).length > 0) {
        props.fetchAssignedCalls({ ...param, ...serverSideParams });
      } else {
        props.fetchAssignedCalls({ ...param, orderBy, direction, page, size });
      }
      setTurnOnReactFetch(true);
    }
  };

  const validate = () => {
    const errors = [];
    if (param.bukrs === '') {
      errors.push(errorTableText(5));
    }
    setError(() => errors);
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.countryId = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  const [columns, setColumns] = useState([...initialColumns]);
  const finishColumns = data => {
    setColumns([...data]);
  };

  const handleClear = fieldName => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.countryId = '';
          break;
        case 'bukrs':
          prevParam.bukrs = '';
          break;
        case 'branchId':
          prevParam.branchId = '';
          break;
        default:
          prevParam[fieldName] = '';
      }
      return prevParam;
    });
  };

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>{messages['country']}</label>
            <DropdownClearable
              options={countryOptions}
              value={param.countryId}
              placeholder={messages['country']}
              onChange={(e, o) => onInputChange(o, 'countryId')}
              handleClear={() => handleClear('countryId')}
            />
          </Form.Field>
          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <DropdownClearable
              options={companyOptions}
              value={param.bukrs}
              placeholder={messages['bukrs']}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              handleClear={() => handleClear('bukrs')}
            />
          </Form.Field>
          <Form.Field>
            <label>{messages['brnch']}</label>
            <DropdownClearable
              options={serviceBranchOptions}
              value={param.branchId}
              placeholder={messages['brnch']}
              onChange={(e, o) => onInputChange(o, 'branchId')}
              handleClear={() => handleClear('branchId')}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['date']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['date']}
                selected={
                  param.crmScheduleDateAt === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.crmScheduleDateAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    crmScheduleDateAt: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
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
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
        <OutputErrors errors={error} />
      </Form>
      <Divider />
      {Object.keys(assignedCalls).length !== 0 ? (
        <Segment>
          <h4>{`Общее количество ${assignedCalls.totalElements}`}</h4>
        </Segment>
      ) : null}

      <ReactTableServerSideWrapper
        data={assignedCalls ? assignedCalls.data : []}
        filterable={true}
        columns={columns}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchAssignedCalls({ ...params, ...param });
          setServerSideParams({ ...params });
        }}
        pages={assignedCalls ? assignedCalls.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    assignedCalls: state.smopspReducer.assignedCalls,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchAssignedCalls,
})(injectIntl(AssignedCalls));
