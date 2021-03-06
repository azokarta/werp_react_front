import React from 'react';

import { Button, Icon, Modal, Header, Checkbox } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import checkedSparePart from '../tabs/TabSmcsWithoutRequest';
import matchSorter from 'match-sorter';

const ModalAddSparePart = props => {
  const {
    intl: { messages },
  } = props;

  const {
    data = [],
    modalOpen = false,
    handleApplySparePart,
    checkedSparePart,
  } = props;

  const columnsSparePart = [
    {
      Header: '',
      Cell: ({ original }) => (
        <Checkbox
          checked={original.checked}
          onClick={() => checkedSparePart(original)}
        />
      ),
      filterable: false,
      width: 50,
    },
    {
      Header: 'Код',
      accessor: 'matnrCode',
      filterMethod: (filter, original) =>
        matchSorter(original, filter.value, { keys: ['matnrCode'] }),
      filterAll: true,
    },
    {
      Header: 'Название',
      accessor: 'matnrName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['matnrName'] }),
      filterAll: true,
      width: 300,
      maxWidth: 300,
      minWidth: 200,
    },
    {
      Header: 'Цена',
      accessor: 'matnrPrice',
      filterable: false,
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
      filterAll: true,
      filterable: false,
    },
    {
      Header: 'В подочете',
      accessor: 'menge',
      filterable: false,
    },
  ];
  return (
    <Modal open={modalOpen} closeOnDimmerClick dimmer={'blurring'}>
      <Header content="Добавить запчасть" />
      <Modal.Content>
        <ReactTableWrapper
          filterable={true}
          data={data}
          columns={columnsSparePart}
          previousText={messages['Table.Previous']}
          nextText={messages['Table.Next']}
          showPagination={true}
          className="-striped -highlight"
          defaultPageSize={10}
          pageSizeOptions={[10, 20, 30, 40]}
          loadingText={messages['Table.Next']}
          noDataText={messages['Table.NoData']}
          rowsText={messages['Table.Rows']}
          pageText={messages['Table.Page']}
          ofText={messages['Table.Of']}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleApplySparePart}>
          <Icon name="checkmark" /> Применить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { checkedSparePart })(
  injectIntl(ModalAddSparePart),
);
