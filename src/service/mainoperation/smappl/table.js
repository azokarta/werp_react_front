import React, { useState, useEffect, Fragment } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { fetchAppList } from '../../serviceAction';
import '../../service.css';

const Table = props => {
  const {
    appList,
    searchParams,
    turnOnReactFetch,
    tableCols = [],
    fetchAppList,
  } = props;

  const [tableColumns, setTableColumns] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    setServiceRequests(appList.data);
  }, [appList]);

  useEffect(() => {
    setTableColumns(tableCols);
  }, [tableCols]);

  console.log(serviceRequests);

  return (
    <Fragment>
      <ReactTableServerSideWrapper
        data={serviceRequests}
        columns={tableColumns}
        filterable={true}
        searchParam={searchParams}
        turnOnReactFetch={turnOnReactFetch}
        showPagination={false}
        requestData={param => {
          fetchAppList({ ...param });
        }}
        className="-striped -highlight"
      />
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    appList: state.serviceReducer.appList,
    appMasterList: state.serviceReducer.appMasterList,
  };
};

export default connect(mapStateToProps, {
  fetchAppList,
})(Table);
