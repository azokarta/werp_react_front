import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Label, Form, Table, Header } from 'semantic-ui-react';

const PurchasesPanelDisplay = (props) => {
  const { otherPurchases, cancelledAt } = props;
  return (
    <Segment raised>
      <Label color="olive" ribbon>
        Другие покупки
      </Label>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as="h4">Продукты</Header>
            <Table celled structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell># Договора</Table.HeaderCell>
                  <Table.HeaderCell>Продукт</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {
                otherPurchases &&
                otherPurchases.map(item => (
                  <Table.Body>
                    <Table.Row key={item.contractNumber}>
                      <Table.Cell>{item.contractNumber}</Table.Cell>
                      <Table.Cell>{item.productName}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field
                label="Дата возврата"
                control="input"
                value={cancelledAt}
                width="6"
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

PurchasesPanelDisplay.propTypes = {
  otherPurchases: PropTypes.array,
  cancelledAt: PropTypes.string.isRequired,
};

export default PurchasesPanelDisplay;
