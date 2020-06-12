import React from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

const SaleOfSparePart = props => {
  const {
    data = [],
    onChangeSettingService,
    deleteSparePart,
    quantitySparePart,
    onChangeSparePart,
    disabledEdit,
  } = props;

  const columns = [
    {
      Header: '№',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      Cell: row => {
        return <div>{row.index + 1}</div>;
      },
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
          disabled={disabledEdit}
          size="mini"
          style={{ padding: '0' }}
          value={original.quantity}
          type="number"
          label={{ content: 'шт' }}
          labelPosition="right"
          fluid
          onChange={item =>
            onChangeSparePart(item, 'quantitySparePart', original)
          }
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
          disabled={disabledEdit}
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
          onClick={() => onChangeSparePart(original, 'deleteSparePart')}
          disabled={disabledEdit}
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
        pageSize={data.length > 10 ? 10 : data.length}
      />
      <Divider />

      <Button
        icon
        labelPosition="left"
        color="green"
        size="small"
        onClick={item => onChangeSparePart(item, 'addSparePartBtn')}
        disabled={disabledEdit}
      >
        <Icon name="plus" size="small" />
        Добавить запчасти
      </Button>
    </Segment>
  );
};

export default SaleOfSparePart;