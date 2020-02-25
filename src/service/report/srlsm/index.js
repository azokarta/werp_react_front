import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Segment,
  Container,
  Dropdown,
  Grid,
  Button,
  Table,
  Input,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../service.css';
import {
  f4fetchCategory,
  f4FetchStaffList,
  f4FetchServiceStatusList,
} from '../../../reference/f4/f4_action';

import { fetchServiceTypeId } from '../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../serviceReportAction';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { momentToStringYYYYMMDD } from '../../../utils/helpers';
require('moment/locale/ru');
require('moment/locale/tr');

const Srlsm = props => {
  const {
    intl: { messages },
    language,
    companyOptions = [],
    branchOptions,
    srlsmList = [],
    fetchServiceListManager,
    category,
    f4fetchCategory,
    f4FetchStaffList,
    serviceTypeId = [],
    fetchServiceTypeId,
    f4FetchServiceStatusList,
    serviceStatusList = [],
  } = props;

  console.log('srlsmList', srlsmList);

  const emptySrlsmParam = {
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceTypeId: '',
    serviceStatusId: '',
    dateStart: '',
    dateEnd: '',
  };
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [srlsmParam, setSrlsmParam] = useState({ ...emptySrlsmParam });
  const [startDates, setStartDates] = useState(moment(new Date(y - 1, m, 1)));
  const [endDates, setEndDates] = useState(moment(new Date()));
  const columnsSrlsm = [
    {
      Header: 'Филиал',
      accessor: 'recommenderId',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Дата',
      accessor: 'recommender',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'CN',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Заводской номер',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'ФИО клиента',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Статус сервиса',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Мастер',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Оператор',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Вид сервиса',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Сумма',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Оплачено',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Остаток',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Сервис №',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'История клиента',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
  ];
  const [columns, setColumns] = useState([...columnsSrlsm]);

  useEffect(() => {
    setSrlsmParam({
      ...srlsmParam,
      dateStart: momentToStringYYYYMMDD(startDates),
      dateEnd: momentToStringYYYYMMDD(endDates),
    });
  }, [startDates, endDates]);

  console.log('srlsmParam', srlsmParam);

  useEffect(() => {
    f4fetchCategory();
    fetchServiceTypeId();
    f4FetchServiceStatusList();
  }, []);

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const serviceTypeOptions = serviceTypeId.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
      value: item.id,
    };
  });

  const serviceStatusOptions = serviceStatusList.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
      value: item.id,
    };
  });

  const handleClickApply = () => {
    props.fetchServiceListManager(srlsmParam);
  };

  const onInputChange = (o, fieldName) => {
    setSrlsmParam(prev => {
      const varSrlsm = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varSrlsm.bukrs = o.value;
          break;
        case 'branchId':
          varSrlsm.branchId = o.value;
          break;

        case 'categoryId':
          varSrlsm.categoryId = o.value;
          break;
        case 'serviceTypeId':
          varSrlsm.serviceTypeId = o.value;
          break;

        case 'serviceStatusId':
          varSrlsm.serviceStatusId = o.value;
          break;
        case 'dateStart':
          varSrlsm.dateStart = o.value;
          break;

        default:
          varSrlsm[fieldName] = o.value;
      }
      return varSrlsm;
    });
  };

  const getBranchOptions = (brOptions, bukrs) => {
    const brachOptions = brOptions;
    if (!bukrs) {
      return [];
    }
    let out = brachOptions[bukrs].map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text}`,
        value: parseInt(c.value, 10),
      };
    });

    return out;
  };

  return (
    <Container fluid className="containerMargin">
      <Segment>
        <h3>Менеджер: Список сервисов</h3>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Row columns={9}>
            <Grid.Column>
              <label>Компания</label>
              <Dropdown
                options={companyOptions}
                fluid
                selection
                placeholder="Компания"
                onChange={(e, o) => onInputChange(o, 'bukrs')}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Филиал</label>
              <Dropdown
                fluid
                selection
                placeholder="Филиал"
                onChange={(e, o) => onInputChange(o, 'branchId')}
                options={getBranchOptions(branchOptions, srlsmParam.bukrs)}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Категория товара</label>
              <Dropdown
                options={categoryOptions}
                onChange={(e, o) => onInputChange(o, 'categoryId')}
                fluid
                selection
                placeholder="Категория товара"
              />
            </Grid.Column>
            <Grid.Column>
              <label>Вид сервиса</label>
              <Dropdown
                options={serviceTypeOptions}
                onChange={(e, o) => onInputChange(o, 'serviceTypeId')}
                fluid
                selection
                placeholder="Вид сервиса"
              />
            </Grid.Column>
            <Grid.Column>
              <label>Статус сервиса</label>
              <Dropdown
                options={serviceStatusOptions}
                onChange={(e, o) => onInputChange(o, 'serviceStatusId')}
                fluid
                selection
                placeholder="Статус сервиса"
              />
            </Grid.Column>
            <Grid.Column>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={startDates}
                onChange={date => setStartDates(date)}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
            </Grid.Column>
            <Grid.Column>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={endDates}
                onChange={date => setEndDates(date)}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
            </Grid.Column>
            <Grid.Column verticalAlign="bottom">
              <Button onClick={handleClickApply} color="blue">
                Применить
              </Button>
            </Grid.Column>
            <Grid.Column>
              <label>Столбцы</label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Общая сумма</Table.Cell>
            <Table.Cell>
              <Input readOnly type="text" value="654654" />
            </Table.Cell>
            <Table.Cell>Оплачено</Table.Cell>
            <Table.Cell>
              <Input readOnly type="text" value="654654" />
            </Table.Cell>
            <Table.Cell>Остаток</Table.Cell>
            <Table.Cell>
              <Input readOnly type="text" value="654654" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Премия мастера</Table.Cell>
            <Table.Cell>
              <Input readOnly type="text" value="654654" />
            </Table.Cell>
            <Table.Cell>Премия оператора</Table.Cell>
            <Table.Cell>
              <Input readOnly type="text" value="654654" />
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <ReactTableServerSideWrapper data={srlsmList} columns={columns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    srlsmList: state.serviceReportReducer.srlsmList,
    category: state.f4.category,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    serviceStatusList: state.f4.serviceStatusList,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  f4fetchCategory,
  fetchServiceTypeId,
  f4FetchServiceStatusList,
})(injectIntl(Srlsm));
