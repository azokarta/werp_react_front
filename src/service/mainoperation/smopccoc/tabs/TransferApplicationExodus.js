import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Button,
  Popup,
  Form,
  Divider,
  Icon,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import moment from 'moment';

import { fetchTransferApplicationExodus } from '../smopccocAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../../utils/ModalColumns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';

const TransferApplicationExodus = props => {
  const {
    intl: { messages },
    language,
  } = props;

  const {
    companyOptions = [],
    countryOptions,
    serviceStatusOptions = [],
    serviceDateTypeOptions,
    branches,
    finStatusOption,
    crmCategoryOptions = [],
    transfer,
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    contractStatusId: '',
    serviceDateType: '',
    crmCategory: '',
    applicationStatus: '',
    dateOpenAt: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Филиал',
      accessor: 'branch',
      checked: true,
    },
    {
      Header: 'CN',
      accessor: 'contract_number',
      checked: true,
    },
    {
      Header: 'Заводской номер',
      accessor: 'tovarSn',
      checked: true,
    },
    {
      Header: 'Дата продажи',
      accessor: 'contractDate',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Дата переноса',
      accessor: '888',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Дата заявки',
      accessor: '999',
      checked: true,
      filterable: false,
    },
    {
      Header: 'ФИО клиента',
      accessor: 'customerFIO',
      checked: true,
    },
    {
      Header: 'Адрес',
      accessor: 'address',
      checked: true,
    },
    {
      Header: 'Телефон',
      accessor: 'phone',
      checked: true,
    },
    {
      Header: 'ФИО мастер',
      accessor: 'dealerFIO',
      checked: true,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Категория',
      accessor: 'crmCategory',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Статус заявки',
      accessor: '15',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Заявка',
      accessor: '898',
      checked: true,
      filterable: false,
      Cell: ({ original }) => <h1>{original.contractNumber}</h1>,
    },
    {
      Header: 'Просмотр',
      accessor: '16',
      checked: true,
      filterable: false,
      Cell: (
        <div style={{ textAlign: 'center' }}>
          <Popup
            content="Просмотр сервис карту"
            trigger={<Button icon="address card" />}
          />
        </div>
      ),
    },
  ];

  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);

  useEffect(() => {
    let servBrOptions = branches
      .filter(
        item =>
          item.business_area_id == 5 ||
          item.business_area_id == 6 ||
          item.business_area_id == 9,
      )
      .map(item => {
        return {
          key: item.branch_id,
          text: item.text45,
          value: item.branch_id,
          country_id: item.country_id,
          bukrs: item.bukrs,
        };
      });
    if (param.countryId !== '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions
        .filter(item => item.country_id === param.countryId)
        .filter(item => item.bukrs === param.bukrs);
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId !== '' && param.bukrs === '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.country_id === param.countryId,
      );
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId === '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.bukrs === param.bukrs,
      );

      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.countryId === '' && param.bukrs === '') {
      setServiceBranchOptions([...servBrOptions]);
    }
  }, [branches, param.countryId, param.bukrs]);

  const handleClickApplyTransfer = () => {
    const page = 0;
    const size = 20;
    props.fetchTransferApplicationExodus({ ...param, page, size });
    setTurnOnReactFetch(true);
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

        case 'finStatus':
          prevParam.contractStatusId = o.value;
          break;

        case 'serviceDateType':
          prevParam.serviceDateType = o.value;
          break;

        case 'crmCategory':
          prevParam.crmCategory = o.value;
          break;

        case 'applicationStatus':
          prevParam.applicationStatus = o.value;
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

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label={messages['country']}
            placeholder={messages['country']}
            options={countryOptions}
            onChange={(e, o) => onInputChange(o, 'countryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['bukrs']}
            placeholder={messages['bukrs']}
            options={companyOptions}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['brnch']}
            placeholder={messages['brnch']}
            options={serviceBranchOptions}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['fin_status']}
            placeholder={messages['fin_status']}
            options={finStatusOption}
            onChange={(e, o) => onInputChange(o, 'finStatus')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['service_period']}
            placeholder={messages['service_period']}
            options={serviceDateTypeOptions}
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />

          <Form.Select
            label={messages['category']}
            placeholder={messages['category']}
            options={crmCategoryOptions}
            onChange={(e, o) => onInputChange(o, 'crmCategory')}
            className="alignBottom"
          />

          <Form.Select
            label={messages['application_status']}
            placeholder={messages['application_status']}
            options={serviceStatusOptions}
            onChange={(e, o) => onInputChange(o, 'applicationStatus')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['date']}</label>
              <DatePicker
                className="date-auto-width"
                placeholderText={messages['date']}
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateOpenAt === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateOpenAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenAt: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={moment(new Date())}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApplyTransfer}
              color="blue"
              className="alignBottom"
            >
              <Icon name="search" />
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
      </Form>
      <Divider />
      <ReactTableServerSideWrapper
        data={transfer ? transfer.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={param => {
          props.fetchServiceFilterPlan({ ...param });
        }}
        pages={transfer ? transfer.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    transfer: state.smopccocReducer.transfer,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchTransferApplicationExodus,
})(injectIntl(TransferApplicationExodus));
