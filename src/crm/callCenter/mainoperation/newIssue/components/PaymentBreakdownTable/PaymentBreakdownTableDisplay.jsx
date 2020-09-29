import React from 'react';
import { Table } from 'semantic-ui-react';
import { formatDate } from '../../../../../../../src/utils/helpers';

const PaymentBreakdownTableDisplay = props => {
  const { monthlyPayments, currency } = props;
  return (
    <Table structured celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="1">#</Table.HeaderCell>
          <Table.HeaderCell>Дата</Table.HeaderCell>
          <Table.HeaderCell>Сумма</Table.HeaderCell>
          <Table.HeaderCell>Выплачено</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {monthlyPayments &&
          monthlyPayments.map((item, idx) => (
            <Table.Row key={idx}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>{formatDate(item.date, 'DD.MM.YYYY')}</Table.Cell>
              <Table.Cell>{`${item.toBePaidAmount} ${currency}`} </Table.Cell>
              <Table.Cell>{`${item.paidAmount} ${currency}`}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default PaymentBreakdownTableDisplay;
