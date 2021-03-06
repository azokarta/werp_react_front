import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Segment,
  Button,
  Container,
  Table,
  Grid,
  Dropdown,
} from 'semantic-ui-react';
import { fetchAllEllist } from '../ditAction';
import LazyPagination from '../../general/pagination/LazyPagination';
import { injectIntl } from 'react-intl';

class EventLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bukrs: '',
    };
    this.loadItems = this.loadItems.bind(this);
    this.onPaginationItemClick = this.onPaginationItemClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  onPaginationItemClick(page) {
    this.loadItems(page, this.state.bukrs);
  }

  loadItems(page, bukrs = '0000') {
    let temp = [];
    temp.push('page=' + page);
    temp.push('bukrs=' + bukrs);
    let q = temp.join('&');
    this.props.fetchAllEllist(q);
  }

  componentWillMount() {
    this.loadItems(0);
  }

  inputChange(o) {
    let bukrs = this.state.bukrs;
    if (o) {
      bukrs = o.value;
    } else {
      bukrs = null;
    }

    this.setState({
      ...this.state,
      bukrs: bukrs,
    });
  }

  submitButton() {
    let bukrs = this.state.bukrs;
    this.loadItems(0, bukrs);
  }

  render() {
    const { messages } = this.props.intl;
    const isEnabled =
      this.state.bukrs === undefined || this.state.bukrs === null;
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
        <Segment clearing>
          <Header as="h2" floated="left">
            {messages['event_log']}
          </Header>
        </Segment>
        <Grid>
          <Grid.Column floated="right" width={3}>
            <Segment tertiary>
              <Header as="h4">{messages['bukrs']}</Header>
              <Dropdown
                fluid
                selection
                search
                options={this.getCompanyOptions()}
                onChange={(e, o) => this.inputChange(o)}
              />
              <br />
              <Button
                color="teal"
                floated="right"
                onClick={() => this.submitButton()}
                disabled={isEnabled}
              >
                {messages['Button.Search']}
              </Button>
              <br /> <br />
            </Segment>
          </Grid.Column>
          <Grid.Column floated="left" width={13}>
            <Segment tertiary>{this.renderTable(messages)}</Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
  renderTable(messages) {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Branch']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Client']}</Table.HeaderCell>
            <Table.HeaderCell>
              {messages['Table.ResponsibleStaff']}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {messages['Table.AppointerStaff']}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderTableBody(messages)}</Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="2">
              {messages['overallSum']}: {this.props.evRowPr.totalRows}
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="6">
              <LazyPagination
                onItemClick={this.onPaginationItemClick}
                totalRows={this.props.evRowPr.totalRows}
                currentPage={this.props.evRowPr.page}
                perPage={this.props.evRowPr.perPage}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  renderTableBody(messages) {
    if (
      this.props.events.length === 0 ||
      this.props.events.length === undefined
    ) {
      return [];
    }
    return this.props.events.map(ev => {
      return (
        <Table.Row key={ev.id}>
          <Table.Cell>{ev.id}</Table.Cell>
          <Table.Cell>{ev.typeName}</Table.Cell>
          <Table.Cell>{ev.msg}</Table.Cell>
          <Table.Cell>{ev.staff.fullFIO}</Table.Cell>
          <Table.Cell>{ev.datetime}</Table.Cell>
        </Table.Row>
      );
    });
  }

  getCompanyOptions() {
    const { companyOptions } = this.props;
    if (!companyOptions) {
      return [];
    }
    let out = companyOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text} ${parseInt(c.value, 10)}`,
        value: parseInt(c.value, 10),
      };
    });
    return out;
  }
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    events: state.ditReducer.events,
    evRowPr: state.ditReducer.evRowPr,
  };
}

export default connect(
  mapStateToProps,
  { fetchAllEllist },
)(injectIntl(EventLog));
