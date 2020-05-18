import React from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';

const SaleOfSparePart = props => {
  const {
    data = [],
    addSparePartBtn,
    deleteSparePart,
    quantitySparePart,
  } = props;

  console.log('DATA', data);

  const columns = [
    {
      Header: '№',
      accessor: 'matnrCode',
      width: 50,
      // Cell: index => <p>{index + 1}</p>,
    },
    {
      Header: 'Наименование',
      accessor: 'matnrName',
      width: 500,
    },
    {
      Header: 'Количество',
      accessor: 'quantity',
      Cell: ({ original }) => (
        <Input
          size="mini"
          style={{ padding: '0' }}
          value={original.quantity}
          type="number"
          label={{ content: 'шт' }}
          labelPosition="right"
          fluid
          onChange={e => quantitySparePart(e, original)}
        />
      ),
    },
    {
      Header: 'Сумма',
      accessor: 'sum',
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
    },
    {
      Header: 'Гарантия',
      accessor: 'warranty',
      Cell: ({ original }) => (
        <Checkbox
          // checked={original.warranty}
          label="Гарантия"
          //   onChange={() => warrantySparePart(item)}
        />
      ),
    },
    {
      Header: '',
      accessor: 'delete',
      Cell: ({ original }) => (
        <Button
          size="mini"
          color="red"
          onClick={() => deleteSparePart(original)}
        >
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <Segment>
      <h5>Продажа запчастей</h5>
      <Divider />
      <ReactTableWrapper
        data={data}
        columns={columns}
        className="-striped -highlight"
        defaultPageSize={data.length <= 5 ? 5 : 10}
      />
      <Divider />

      <Button
        // disabled={editStatus}
        icon
        labelPosition="left"
        color="green"
        size="small"
        onClick={addSparePartBtn}
      >
        <Icon name="plus" size="small" />
        Добавить запчасти
      </Button>
    </Segment>
  );
};

export default SaleOfSparePart;
