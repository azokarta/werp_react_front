import React from 'react';
import { Table, Modal, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DropdownClearable from '../../../../../utils/DropdownClearable';

const ModalApplications = props => {
  const {
    open,
    closeModal,
    applications = [],
    onClose,
    masterOptions = [],
    onChangeMasterApp,
    clearApplicationsMaster,
  } = props;
  return (
    <Modal open={open} closeIcon onClose={onClose}>
      <Header content="Выберите доступные заявки" />
      <Modal.Content>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>CN</Table.HeaderCell>
              <Table.HeaderCell>ФИО клиента</Table.HeaderCell>
              <Table.HeaderCell>Мастер</Table.HeaderCell>
              <Table.HeaderCell>Оператор</Table.HeaderCell>
              <Table.HeaderCell>Вид заявки</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {applications.map(item => (
              <Table.Row key={item.applicationNumber}>
                <Table.Cell>{item.contractNumber}</Table.Cell>
                <Table.Cell>{item.customerFIO}</Table.Cell>
                <Table.Cell>
                  <DropdownClearable
                    fluid
                    selection
                    options={masterOptions}
                    value={item.masterId ? item.masterId : ''}
                    onChange={(e, { value }) => onChangeMasterApp(item, value)}
                    handleClear={() => clearApplicationsMaster(item)}
                  />
                </Table.Cell>
                <Table.Cell>{item.operatorFIO}</Table.Cell>
                <Table.Cell>{item.applicationTypeName}</Table.Cell>
                <Table.Cell>
                  <Link
                    target="_blank"
                    to={`../mainoperation/smcs?applicationNumber=${item.applicationNumber}`}
                  >
                    <Button color="green" fluid size="mini">
                      Перейти
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={closeModal}>
          Отмена
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalApplications;