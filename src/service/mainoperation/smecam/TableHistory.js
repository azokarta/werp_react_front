import React from 'react';
import { Container, Segment, Popup } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import 'react-table/react-table.css';
import TextAlignCenter from '../../../utils/TextAlignCenter';
import moment from 'moment';

const TableHistory = props => {
  const { data = [], messages } = props;
  let historyColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['changed_by_employee'],
      accessor: 'fullname',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['operationDate'],
      accessor: 'revsttmp',
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterAll: true,
    },
    {
      Header: messages['operationType'],
      accessor: 'revType',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Компания',
      accessor: 'bukrsName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Филиал',
      accessor: 'branchName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Товар',
      accessor: 'tovar',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Вид заявки',
      accessor: 'appTypeName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Оператор',
      accessor: 'operatorName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },

    {
      Header: 'ФИО клиента',
      accessor: 'applicantName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Адрес',
      accessor: 'addressName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Контакты',
      accessor: 'fullPhone',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Заводской номер',
      accessor: 'tovarSn',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Дата установки',
      accessor: 'installmentDate',
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterAll: true,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Установщик',
      accessor: 'masterFIO',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Дата приема в сервисе',
      accessor: 'serviceDate',
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterAll: true,
    },
    {
      Header: 'Время сервиса',
      accessor: 'serviceDate',
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterAll: true,
    },
    {
      Header: 'Дата переноса',
      accessor: 'rescheduledDate',
      Cell: row => (
        <TextAlignCenter
          text={row.value ? moment(row.value).format('DD-MM-YYYY') : ''}
        />
      ),
      filterAll: true,
    },
    {
      Header: 'Статус заявки',
      accessor: 'applicationStatusName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'Примечание',
      accessor: 'info',
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <Popup
            content={row.value}
            on="hover"
            pinned="true"
            trigger={<div style={{ textAlign: 'center' }}>{row.value}</div>}
          />
        </div>
      ),
      filterAll: true,
    },
  ];

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
        <h2> {messages['contract_editing_history']}</h2>
      </Segment>
      <ReactTableWrapper
        data={data}
        columns={historyColumns}
        pageSize={data.length > 10 ? 10 : data.length}
        showPagination={true}
        className="-striped -highlight"
      />
    </Container>
  );
};

export default TableHistory;
