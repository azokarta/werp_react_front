/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import OperatorEditModal from '../OperatorEdit/OperatorEditModal';

class ContractListTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
      modalOpen: false,
      contractId: undefined,
      contractNumber: undefined,
      operatorId: undefined,
    };

    this.handleEditModal = this.handleEditModal.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleEditModal() {
    this.setState({
      modalOpen: true,
    });
  }

  handleModalClose() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    let options;
    if (this.props.result) {
      let visited = {};
      const opers = this.props.result.map(item => item.operator);
      visited = _.mapKeys(opers, 'id');
      options = Object.values(visited).map((operator) => {
        if (operator) {
          return (<option value={operator.id} key={operator.id}>
            {operator.lastName} {operator.firstName}
                  </option>);
        }
      });
    }
    const columns = [
      {
        Header: 'SN договор',
        accessor: 'contractNumber',
        maxWidth: 100,
        filterable: true,
        Cell: (props) => {
          const { contractNumber } = props.original;
          return (
            <Link target="_blank" to={`/newIssue/${contractNumber}`}>
              {contractNumber}
            </Link>
          );
        },
      },
      {
        Header: 'Дата договора',
        accessor: 'contractDate',
        Cell: (props) => {
          const { contractDate } = props.original;
          return moment(contractDate).format('DD.MM.YYYY');
        },
        maxWidth: 110,
      },
      {
        Header: 'ФИО',
        accessor: 'customer',
        Cell: (props) => {
          const { customer } = props.original;
          return (
            <div>
              {customer.lastName} {customer.firstName} {customer.patronymic}
            </div>
          );
        },
        maxWidth: 270,
      },
      {
        Header: 'Филиал',
        accessor: 'companyBranchName',
        maxWidth: 160,
      },
      {
        Header: 'Продукт',
        accessor: 'productName',
        maxWidth: 160,
      },
      {
        Header: 'ФИО Диллера',
        accessor: 'dealer',
        Cell: (props) => {
          const { dealer } = props.original;
          return (
            <div>
              {dealer && dealer.lastName} {dealer && dealer.firstName} {dealer && dealer.patronymic}
            </div>
          );
        },
        maxWidth: 270,
      },
      {
        Header: 'Состояние',
        accessor: 'status.text',
        maxWidth: 160,
      },
      // {
      //   Header: 'Последнее примечание',
      //   accessor: 'lastNote',
      //   maxWidth: 160,
      // },
      {
        Header: 'Обновлено',
        accessor: 'modifiedAt',
        Cell: (props) => {
          const { modifiedAt } = props.original;
          return moment(modifiedAt).utc().format('DD.MM.YYYY, hh:mm:ss');
        },
        maxWidth: 160,
      },
      {
        Header: 'Оператор',
        accessor: 'operator.id',
        id: 'opr',
        maxWidth: 270,
        Cell: (props) => {
          const { operator } = props.original;
          return (
            <div>
              {operator && operator.lastName} {operator && operator.firstName} {operator && operator.patronymic}
            </div>
          );
        },
        filterable: true,
        filterMethod: (filter, row) => {
          if (filter.value === '0') {
            return true;
          }
          return String(row[filter.id]) === filter.value;
        },
        Filter: ({ filter, onChange }) =>
          (<select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : '0'}
          >
            <option value="0">Все</option>
            {options}
           </select>),
      },
      {
        accessor: 'contractNumber',
        maxWidth: 60,
        Cell: () => (
          <div style={{ textAlign: 'center' }}>
            <Icon link name="edit" size="large" color="black" onClick={this.handleEditModal} />
          </div>),
      },
    ];
    return (
      <div>
        <ReactTable
          loading={this.props.loading}
          data={this.props.result}
          columns={columns}
          pageSizeOptions={[10, 20, 30, 50]}
          defaultPageSize={10}
          previousText="Предыдущий"
          nextText="Следующий"
          loadingText="Загружается..."
          noDataText="Нет записей"
          pageText="Страница"
          ofText="из"
          rowsText="записей"
          className="-highlight"
          getTrProps={(state, rowInfo) => ({
            onClick: () => {
              this.setState({
                selectedIdx: rowInfo.index,
                contractNumber: rowInfo.original.contractNumber,
                contractId: rowInfo.original.id,
                operatorId: rowInfo.original.operator.id,
              });
            },
            style: {
              background: (rowInfo === undefined ? '' : (this.state.selectedIdx === rowInfo.index ? 'rgba(241,250,229, 1)' : '')),
            },
          })}
          getTheadProps={() => ({
            style: {
              background: 'rgba(227,232,238, 1)',
            },
          })}
        />
        <OperatorEditModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleModalClose}
          {...this.state}
        />
      </div>
    );
  }
}

ContractListTableComponent.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default ContractListTableComponent;
