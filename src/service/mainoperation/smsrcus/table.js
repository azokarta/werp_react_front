import React from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import { Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const DataTable = props => {
  const {
    columnsName,
    dynamicObject,
    fetchSmsrcus,
    turnOnReactFetch,
    searchParams,
    messages,
    headersName,
  } = props;
  let page,
    oldPage = dynamicObject.totalPages ? dynamicObject.totalPages : 1;
  const getColumnsForTable = columnsName => {
    //select columns which show === true
    let columnsForShow = [];
    let Header;

    // i - index for columnsName j- index for
    for (let i = 0, j = 0; i < columnsName.length; i++) {
      if (columnsName[i].show) {
        columnsForShow[j] = columnsName[i];
        j++;
      }
    }
    //TableColumns which we see
    let columns = columnsForShow.map(e => {
      headersName.map(el => {
        if (el.id === e.id) {
          Header = el.Header;
        }
      });
      if (e.accessor === 'customerStory') {
        return {
          Header: Header,
          Cell: row => (
            <div style={{ textAlign: 'center' }}>
              <Link
                to={`/service/mainoperation/smcuspor?contractNumber=${row.original.contractNumber}`}
                target="_blank"
              >
                <Button size="mini" icon>
                  <Icon name="address card" size="large" color="black" />{' '}
                </Button>
              </Link>
            </div>
          ),
          filterable: false,
        };
      }
      return {
        Header: Header,
        accessor: e.accessor, //Name
        Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        filterable:
          (Header === messages['brnch']) |
            (Header === messages['Table.Date']) ||
          Header === messages['financial_status']
            ? false
            : true,
      };
    });
    return columns;
  };

  return (
    <div>
      <ReactTableServerSideWrapper
        columns={getColumnsForTable(columnsName)}
        data={Object.keys(dynamicObject).length === 0 ? [] : dynamicObject.data}
        pages={dynamicObject.totalPages}
        filterable={true}
        defaultPageSize={20}
        searchParam={searchParams}
        showPagination={true}
        requestData={param => {
          page = dynamicObject.totalPages;
          fetchSmsrcus({ ...param, page });
        }}
        turnOnReactFetch={turnOnReactFetch}
        className="-striped -highlight"
      />
    </div>
  );
};
export default DataTable;
