import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider } from 'semantic-ui-react';
import 'react-table/react-table.css';
import { fetchRescheduledApplication } from '../smopspAction';
import { fetchServiceTypeId } from '../../smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import ModalColumns from '../../../../utils/ModalColumns';
import { LinkToSmcuspor } from '../../../../utils/outlink';

const TransferApplication = props => {
  const {
    countryOptions,
    companyOptions = [],
    branches,
    finStatusOption,
    serviceDateTypeOptions,
    categoryOptions,
    warrantyOptions,
  } = props;

  const {
    intl: { messages },
    language,
    fetchRescheduledApplication,
    rescheduledApp = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    contractStatusId: '',
    crmCategory: '',
    serviceDateType: '',
    warranty: '',
    dateOpenAt: '',
    applicationStatusId: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);

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

  const initialColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
    },
    {
      Header: 'Филиал',
      accessor: 'branchId',
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
      accessor: 'rescheduledDate',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Дата заявки',
      accessor: 'applicationDate',
      checked: true,
      filterable: false,
    },
    {
      Header: 'ФИО клиента',
      accessor: 'customerFIO',
      checked: true,
      with: 200,
    },
    {
      Header: 'ИИН клиента',
      accessor: 'customerIinBin',
      checked: true,
      with: 150,
    },
    {
      Header: 'Адрес',
      accessor: 'address',
      checked: true,
    },
    {
      Header: 'ФИО дилера',
      accessor: 'dealerFIO',
      checked: true,
      with: 200,
      filterable: false,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Гарантия',
      accessor: 'warrantyId',
      checked: true,
      filterable: false,
    },

    {
      Header: 'Категория',
      accessor: 'crmCategoryId',
      checked: true,
      filterable: false,
    },

    {
      Header: 'Статус заявки',
      accessor: 'applicationStatusId',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Фин. статус',
      accessor: 'contractStatusId',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Заявка',
      accessor: 'applicationNumber',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Просмотр',
      accessor: '16',
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text="Просмотр"
          />
        </div>
      ),
      checked: true,
    },
  ];

  const statusApplicationOptions = [
    { key: 1, text: 'Отмена', value: 1 },
    { key: 2, text: 'Выполнен', value: 2 },
  ];

  const handleClickApply = () => {
    const page = 0;
    const size = 20;
    fetchRescheduledApplication({ ...param, page, size });
    setTurnOnReactFetch(true);
  };

  const [columns, setColumns] = useState([...initialColumns]);
  const finishColumns = data => {
    setColumns([...data]);
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

        case 'crmCategory':
          prevParam.crmCategory = o.value;
          break;
        case 'serviceTypeId':
          prevParam.serviceTypeId = o.value;
          break;

        case 'serviceStatusId':
          prevParam.serviceStatusId = o.value;
          break;

        case 'contractStatusId':
          prevParam.contractStatusId = o.value;

        case 'serviceDateType':
          prevParam.serviceDateType = o.value;

        case 'warranty':
          prevParam.warranty = o.value;

        case 'dateOpenAt':
          prevParam.dateOpenAt = o.value;
          break;

        case 'applicationStatusId':
          prevParam.applicationStatusId = o.value;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Страна"
            placeholder="Страна"
            options={countryOptions}
            onChange={(e, o) => onInputChange(o, 'countryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Компания"
            placeholder="Компания"
            options={companyOptions}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Филиал"
            placeholder="Филиал"
            options={serviceBranchOptions}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Фин. Статус"
            placeholder="Фин. Статус"
            options={finStatusOption}
            onChange={(e, o) => onInputChange(o, 'contractStatusId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Срок сервиса"
            placeholder="Срок сервиса"
            options={serviceDateTypeOptions}
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Категория"
            placeholder="Категория"
            options={categoryOptions}
            onChange={(e, o) => onInputChange(o, 'crmCategory')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Гарантия"
            placeholder="Гарантия"
            options={warrantyOptions}
            onChange={(e, o) => onInputChange(o, 'warranty')}
            className="alignBottom"
          />
          <Form.Select
            fluid
            label="Статус заявки"
            placeholder="Статус заявки"
            options={serviceDateTypeOptions}
            onChange={(e, o) => onInputChange(o, 'applicationStatusId')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText="Дата"
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
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              Применить
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
        data={rescheduledApp ? rescheduledApp.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={param => {
          props.fetchRescheduledApplication({ ...param });
        }}
        pages={rescheduledApp ? rescheduledApp.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    rescheduledApp: state.smopspReducer.rescheduledApp,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchRescheduledApplication,
})(injectIntl(TransferApplication));
