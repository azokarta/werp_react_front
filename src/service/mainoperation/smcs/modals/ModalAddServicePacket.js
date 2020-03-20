import React from 'react';

import { Button, Icon, Modal, Header, Checkbox } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import checkedSparePart from '../tabs/TabSmcsWithoutRequest';

const ModalAddServicePacket = props => {
  const {
    intl: { messages },
  } = props;

  const {
    data = [],
    modalOpen = false,
    handleApplyServicePacket,
    checkedServicePacket,
  } = props;

  const columnsServicePacket = [
    {
      Header: '',
      Cell: ({ original }) => (
        <Checkbox
          checked={original.checked}
          onClick={() => checkedServicePacket(original)}
        />
      ),
      width: 30,
      maxWidth: 50,
      minWidth: 20,
    },
    {
      Header: 'Название',
      accessor: 'name',
      filterAll: true,
      width: 500,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      Header: 'Цена',
      accessor: 'price',
      filterAll: true,
      width: 100,
      maxWidth: 150,
      minWidth: 50,
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
      filterAll: true,
      width: 70,
      maxWidth: 100,
      minWidth: 50,
    },
  ];
  return (
    <Modal open={modalOpen} closeOnDimmerClick dimmer={'blurring'}>
      <Header content="Добавить сервис пакет" />
      <Modal.Content>
        <ReactTableWrapper
          data={data}
          columns={columnsServicePacket}
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
        <Button color="green" onClick={handleApplyServicePacket}>
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
  injectIntl(ModalAddServicePacket),
);