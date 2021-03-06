import React, { useState } from 'react';
import {
  Segment,
  Header,
  Divider,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { errorTableText } from '../../../utils/helpers';
import { fetchSmslsp } from '../../serviceAction';
import { injectIntl } from 'react-intl';
import OutputErrors from '../../../general/error/outputErrors';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import 'react-table/react-table.css';
//import EmployeeModal from './EmployeeModal';

import './smslsp.css';

const Smslsp = props => {
  const {
    intl: { messages },
    companyOptions = [],
    listOfEmployees,
    fetchSmslsp,
  } = props;
  const [error, setError] = useState([]);
  const [search, setSearch] = useState({
    bukrs: '',
  });

  const validate = () => {
    const errors = [];
    if (search.bukrs === '') {
      errors.push(errorTableText(5));
    }
    if (errors.length === 0) {
      fetchSmslsp(search);
    }
    return errors;
  };

  const onSearch = () => {
    let errors = [];
    errors = validate();
    setError(() => errors);
  };

  return (
    <Segment>
      <Divider hidden />

      <Header as="h2">{messages['List_of_employees']}</Header>

      <Divider />

      <Dropdown
        clearable="true"
        selection
        options={companyOptions}
        placeholder={messages['bukrs']}
        onChange={(e, { value }) => setSearch({ bukrs: value })}
      />

      <Button color="brown" onClick={onSearch} id="smslspSearchButton">
        <Icon name="search" />
        {messages['search']}
      </Button>
      <OutputErrors errors={error} />
      <br />
      <br />

      {listOfEmployees.length !== 0 ? (
        <ReactTableWrapper
          data={listOfEmployees.data}
          columns={[
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['bukrs']}</div>
              ),
              accessor: 'bukrsName',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Table.Position']}
                </div>
              ),
              accessor: 'positionName',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Table.NameOfEmployee']}
                </div>
              ),
              accessor: 'staffName',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Table.Plan']}
                </div>
              ),
              accessor: 'planCount',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
          ]}
          defaultPageSize={10}
          previousText={messages['Table.Previous']}
          nextText={messages['Table.Next']}
          showPagination={true}
          className="-striped -highlight"
          pageSizeOptions={[10, 20, 30, 40]}
          loadingText={messages['Table.Next']}
          noDataText={messages['Table.NoData']}
          rowsText={messages['Table.Rows']}
          pageText={messages['Table.Page']}
          ofText={messages['Table.Of']}
        />
      ) : null}
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    companyOptions: state.userInfo.companyOptions,
    listOfEmployees: state.serviceReducer.listOfEmployees,
  };
};

export default connect(mapStateToProps, {
  fetchSmslsp,
})(injectIntl(Smslsp));
