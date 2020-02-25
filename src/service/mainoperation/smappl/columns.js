import React, { useState, useEffect, Fragment } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Segment,
  Grid,
  Checkbox,
  Table,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ServiceRequestTable from './table';

const Columns = props => {
  const {
    intl: { messages },
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const allColumns = [
    {
      id: 0,
      accessor: 'branchName',
      show: true,
    },
    {
      id: 1,
      accessor: 'tovarSn',
      show: true,
    },
    {
      id: 2,
      accessor: 'matnr',
      show: true,
    },
    {
      id: 3,
      accessor: 'adate',
      show: true,
    },
    {
      id: 4,
      accessor: 'applicantName',
      show: true,
    },
    {
      id: 5,
      accessor: 'address',
      show: true,
    },
    {
      id: 6,
      accessor: 'inPhoneNum',
      show: true,
    },
    {
      id: 7,
      accessor: 'masterName',
      show: true,
    },
    {
      id: 8,
      accessor: 'appStatusName',
      show: true,
    },
    {
      id: 9,
      accessor: 'operatorName',
      show: true,
    },
    {
      id: 10,
      accessor: 'appTypeName',
      show: true,
    },
    {
      id: 11,
      accessor: 'id',
      show: true,
    },
    {
      id: 12,
      accessor: 'serviceId',
      show: true,
    },
    {
      id: 13,
      accessor: 'awdaw',
      show: true,
    },
  ];
  let headers = [
    {
      id: 0,
      Header: `CN`,
    },
    {
      id: 1,
      Header: messages['productSerialNumber'],
    },
    {
      id: 2,
      Header: messages['TBL_H__PRODUCT'],
    },
    {
      id: 3,
      Header: messages['Application_Date'],
    },
    {
      id: 4,
      Header: messages['Form.Reco.RecoName'],
    },
    {
      id: 5,
      Header: messages['Table.Address'],
    },
    {
      id: 6,
      Header: messages['Phone'],
    },
    {
      id: 7,
      Header: messages['Masters'],
    },
    {
      id: 8,
      Header: messages['L__ORDER_STATUS'],
    },
    {
      id: 9,
      Header: messages['Operator'],
    },
    {
      id: 10,
      Header: messages['type_of_application'],
    },
    {
      id: 11,
      Header: `№ ${messages['Applications']}`,
    },
    {
      id: 12,
      Header: `${messages['service']} №`,
    },
    {
      id: 13,
      Header: messages['customer_story'],
    },
  ];

  const [columns, setColumns] = useState(allColumns);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (localStorage.getItem(username)) {
      setColumns(JSON.parse(localStorage.getItem(localStorage.username)));
    } else {
      setColumns(allColumns);
    }
  }, []);

  const checkColumns = e => {
    setColumns(prev => {
      let columns = [...prev];
      columns.map(el => {
        if (el.accessor === e.accessor) {
          el.show = !el.show;
        }
      });
      return columns;
    });
  };

  const onSave = () => {
    setModalOpen(false);
    localStorage.setItem(localStorage.username, JSON.stringify(columns));
  };

  const onCancel = () => {
    setModalOpen(false);
    const localColumns =
      JSON.parse(localStorage.getItem(localStorage.username)) || allColumns;
    setColumns(localColumns);
  };

  return (
    <Fragment>
      <Modal
        trigger={
          <Button color="blue" onClick={() => setModalOpen(true)}>
            {messages['columns']}
          </Button>
        }
        open={modalOpen}
        size="small"
      >
        <Header content={messages['columns']} />
        <Modal.Content>
          <Table singleLine>
            <Table.Body>
              {columns.map((item, id) => (
                <Table.Row key={id}>
                  <Table.Cell>{headers[id].Header}</Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      onChange={() => {
                        checkColumns(item);
                      }}
                      checked={item.show}
                      style={{ float: 'right' }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={onCancel}>
            <Icon name="remove" /> {messages['cancel']}
          </Button>
          <Button color="green" onClick={onSave}>
            <Icon name="checkmark" /> {messages['save']}
          </Button>
        </Modal.Actions>
      </Modal>
      <ServiceRequestTable columnsName={columns} headers={headers} />
    </Fragment>
  );
};

export default injectIntl(Columns);