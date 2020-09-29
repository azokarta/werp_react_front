import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Segment, Divider, Loader } from 'semantic-ui-react';
import HrDocActions from './HrDocActions';

import {
  DOC_TYPE_RECRUITMENT,
  DOC_TYPE_TRANSFER,
  DOC_ACTION_SAVE,
  DOC_TYPE_CHANGE_SALARY,
  DOC_TYPE_DISMISS,
  DOC_TYPE_EXCLUDE_FROM_KPI,
} from '../../../hrUtil';
import {} from '../../../hrUtil';
import RecruitmentForm from './forms/RecruitmentForm';
import TransferForm from './forms/TransferForm';
import SalaryChangeForm from './forms/SalaryChangeForm';
import DismissForm from './forms/DismissForm';
import ExcludeFromKpiForm from './forms/ExcludeFromKpiForm';
import { blankDocument, createDocument } from '../actions/hrDocAction';
import {
  toggleStaffListModal,
  fetchAllManagers,
  fetchAllDirectors,
} from '../../staff/actions/hrStaffAction';
import {
  f4FetchPositionList,
  f4FetchBusinessAreaList,
  f4FetchDepartmentList,
  f4FetchCurrencyList,
} from '../../../../reference/f4/f4_action';
import { toggleSalaryListModal } from '../../salary/actions/hrSalaryAction';
import StaffF4Modal from '../../../../reference/f4/staff/staffF4Modal';
import SalaryListModal from '../../salary/components/SalaryListModal';
import { fetchAllCurrentStaffs } from '../../staff/actions/hrStaffAction';
import StaffListModal from '../../staff/components/StaffListModal';
import { notify } from '../../../../general/notification/notification_action';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class HrDocCreatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffListModalOpened: false,
      localDocument: {},
    };
  }

  componentWillMount() {
    let docType = parseInt(this.props.match.params.type, 10);
    this.props.blankDocument(docType);
    this.props.f4FetchDepartmentList();
    if (DOC_TYPE_RECRUITMENT === docType) {
      this.props.f4FetchPositionList('hr_document');
      this.props.fetchAllManagers();
      this.props.fetchAllDirectors();
      this.props.f4FetchBusinessAreaList();
    } else if (DOC_TYPE_TRANSFER === docType) {
      this.props.f4FetchPositionList('hr_document');
      this.props.fetchAllManagers();
      this.props.fetchAllDirectors();
      this.props.f4FetchBusinessAreaList();
    } else if (DOC_TYPE_CHANGE_SALARY === docType) {
      this.props.f4FetchCurrencyList('hr_doc');
    } else if (DOC_TYPE_EXCLUDE_FROM_KPI === docType) {
      this.props.fetchAllDirectors();
    }

    this.props.fetchAllCurrentStaffs([]);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.document &&
      nextProps.document.id !== this.state.localDocument.id
    ) {
      this.setState({
        localDocument: Object.assign({}, nextProps.document),
      });
    }
  }

  getBranchOptions = bukrs => {
    let branchOptions = this.props.branchOptions;
    if (!branchOptions || !branchOptions[bukrs]) {
      return [];
    }
    return branchOptions[bukrs];
  };

  getBusinessAreaOptions = bukrs => {
    let businessAreaList = this.props.businessAreaList;
    if (!businessAreaList) {
      return [];
    }

    let out = [];
    for (let k in businessAreaList) {
      if (businessAreaList[k]['bukrs'] === bukrs) {
        out.push({
          key: businessAreaList[k]['business_area_id'],
          value: businessAreaList[k]['business_area_id'],
          text: businessAreaList[k]['name'],
        });
      }
    }
    return out;
  };

  getManagerOptions = branchId => {
    let managerOptions = this.props.managersByBranchOptions;
    if (!managerOptions || !managerOptions[branchId]) {
      return [];
    }

    return managerOptions[branchId];
  };

  getDirectorOptions = branchId => {
    let directorOptions = this.props.directorsByBranchOptions;
    return directorOptions ? directorOptions[branchId] || [] : [];
  };

  addItem = () => {
    let docType = parseInt(this.props.match.params.type, 10);
    switch (docType) {
      case DOC_TYPE_RECRUITMENT:
        this.setState({
          staffListModalOpened: true,
        });
        break;

      case DOC_TYPE_TRANSFER:
      case DOC_TYPE_DISMISS:
      case DOC_TYPE_EXCLUDE_FROM_KPI:
        this.setState({
          staffListModalOpened: true,
        });
        break;

      case DOC_TYPE_CHANGE_SALARY:
        this.props.toggleSalaryListModal(true);
        break;

      default: {
      }
    }
  };

  removeItem = index => {
    let doc = Object.assign({}, this.state.localDocument);
    let items = doc.items || [];
    let newItems = [];
    for (let k in items) {
      if (k != index) {
        newItems.push(items[k]);
      }
    }
    doc['items'] = newItems;

    this.setState({
      ...this.state,
      localDocument: doc,
    });
  };

  handleStaffSelect = staff => {
    let docType = parseInt(this.props.match.params.type, 10);
    let document = Object.assign({}, this.state.localDocument);
    let items = document.items || [];

    for (let k in items) {
      if (items[k]['staffId'] === staff.staffId) {
        this.props.notify('error', 'Сотрудник уже добавлен в список!');
        return;
      }
    }

    if (docType === DOC_TYPE_RECRUITMENT) {
      items.push({
        staffId: staff.staffId,
        staffName: staff.fio,
        amount: 0,
      });

      this.setState({
        ...this.state,
        localDocument: document,
      });

      this.props.toggleStaffListModal(false);
    } else if (docType === DOC_TYPE_TRANSFER) {
      items.push({
        staffId: staff.staffId,
        staffName: staff.fio,
        salaryId: staff.salaryId,
        amount: 0,
      });

      this.setState({
        ...this.state,
        localDocument: document,
      });

      this.props.toggleStaffListModal(false);
    } else if (docType === DOC_TYPE_EXCLUDE_FROM_KPI) {
      items.push({
        staffId: staff.staffId,
        staffName: staff.fio,
        beginDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        amount: 0,
      });

      this.setState({
        ...this.state,
        localDocument: document,
      });

      this.props.toggleStaffListModal(false);
    } else if (docType === DOC_TYPE_DISMISS) {
      if (items && items.length > 0) {
        this.props.notify(
          'error',
          'В одном документе уволить можно только одного сотрудника!',
        );
        return;
      }
      items.push({
        staffId: staff.staffId,
        staffName: staff.fio,
        salaryId: staff.salaryId,
        amount: 0,
      });

      this.setState({
        ...this.state,
        localDocument: document,
      });

      this.props.toggleStaffListModal(false);
    } else if (docType === DOC_TYPE_CHANGE_SALARY) {
      items.push({
        staffId: staff.staffId,
        staffName: staff.staffName,
        salaryId: staff.id,
        amount: staff.amount,
        positionName: staff.positionName,
        positionId: staff.positionId,
        beginDate: null,
        amount: 0,
        currency: staff.currency,
      });

      this.setState({
        ...this.state,
        localDocument: document,
      });

      this.props.toggleSalaryListModal(false);
    }
  };

  handleDocumentChange = (fieldName, fieldValue) => {
    let doc = Object.assign({}, this.state.localDocument);
    doc[fieldName] = fieldValue;
    if (fieldName === 'bukrs') {
      doc['items'] = [];
    }
    this.setState({
      ...this.state,
      localDocument: doc,
    });
  };

  handleItemChange = (index, fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    let doc = Object.assign({}, this.state.localDocument);
    let items = doc.items || [];
    if (!items[index]) {
      return;
    }

    if (fieldName === 'beginDate' || fieldName === 'endDate') {
      if (fieldValue) {
        console.log(fieldName, fieldValue.valueOf());
        fieldValue = fieldValue.valueOf();
      } else {
        fieldValue = null;
      }
    }

    if (fieldName === 'branchId') {
      items[index]['managerId'] = null;
    }

    items[index][fieldName] = fieldValue;
    doc['items'] = items;
    this.setState({
      ...this.state,
      localDocument: doc,
    });
  };

  handleAction = actionType => {
    switch (actionType) {
      case DOC_ACTION_SAVE:
        this.props.createDocument(this.state.localDocument);
        break;

      default:
        break;
    }
  };

  render() {
    const currentType = parseInt(this.props.match.params.type, 10);
    const { messages, locale } = this.props.intl;
    let form;
    let pageTitle = 'Создание документа ' + this.state.localDocument.typeName;
    switch (currentType) {
      case DOC_TYPE_RECRUITMENT:
        form = (
          <RecruitmentForm
            handleItemChange={this.handleItemChange}
            handleDocumentChange={this.handleDocumentChange}
            addItem={this.addItem}
            removeItem={this.removeItem}
            positionList={this.props.positionList}
            departmentList={this.props.departmentList}
            branchOptions={this.getBranchOptions(
              this.state.localDocument.bukrs,
            )}
            businessAreaOptions={this.getBusinessAreaOptions(
              this.state.localDocument.bukrs,
            )}
            directorOptions={this.getDirectorOptions(
              this.state.localDocument.branchId,
            )}
            managerOptions={this.getManagerOptions(
              this.state.localDocument.branchId,
            )}
            bukrsOptions={this.props.bukrsOptions}
            document={this.state.localDocument}
          />
        );
        break;

      case DOC_TYPE_TRANSFER:
        form = (
          <TransferForm
            handleItemChange={this.handleItemChange}
            handleDocumentChange={this.handleDocumentChange}
            addItem={this.addItem}
            removeItem={this.removeItem}
            positionList={this.props.positionList}
            departmentList={this.props.departmentList}
            branchOptions={this.getBranchOptions(
              this.state.localDocument.bukrs,
            )}
            businessAreaOptions={this.getBusinessAreaOptions(
              this.state.localDocument.bukrs,
            )}
            directorOptions={this.getDirectorOptions(
              this.state.localDocument.branchId,
            )}
            getManagerOptions={this.getManagerOptions}
            bukrsOptions={this.props.bukrsOptions}
            document={this.state.localDocument}
          />
        );
        break;

      case DOC_TYPE_CHANGE_SALARY:
        form = (
          <SalaryChangeForm
            handleItemChange={this.handleItemChange}
            handleDocumentChange={this.handleDocumentChange}
            addItem={this.addItem}
            removeItem={this.removeItem}
            positionList={this.props.positionList}
            departmentList={this.props.departmentList}
            branchOptions={this.getBranchOptions(
              this.state.localDocument.bukrs,
            )}
            businessAreaOptions={this.getBusinessAreaOptions(
              this.state.localDocument.bukrs,
            )}
            directorOptions={this.getDirectorOptions(
              this.state.localDocument.branchId,
            )}
            managerOptions={this.getManagerOptions(
              this.state.localDocument.branchId,
            )}
            bukrsOptions={this.props.bukrsOptions}
            document={this.state.localDocument}
            currencyList={this.props.currencyList}
          />
        );

        break;

      case DOC_TYPE_DISMISS:
        form = (
          <DismissForm
            fetchCurrentStaffs={[]}
            handleItemChange={this.handleItemChange}
            handleDocumentChange={this.handleDocumentChange}
            addItem={this.addItem}
            removeItem={this.removeItem}
            positionList={this.props.positionList}
            departmentList={this.props.departmentList}
            branchOptions={this.getBranchOptions(
              this.state.localDocument.bukrs,
            )}
            businessAreaOptions={this.getBusinessAreaOptions(
              this.state.localDocument.bukrs,
            )}
            directorOptions={this.getDirectorOptions(
              this.state.localDocument.branchId,
            )}
            managerOptions={this.getManagerOptions(
              this.state.localDocument.branchId,
            )}
            bukrsOptions={this.props.bukrsOptions}
            document={this.state.localDocument}
          />
        );
        break;

      case DOC_TYPE_EXCLUDE_FROM_KPI:
        form = (
          <ExcludeFromKpiForm
            fetchCurrentStaffs={[]}
            handleItemChange={this.handleItemChange}
            handleDocumentChange={this.handleDocumentChange}
            addItem={this.addItem}
            removeItem={this.removeItem}
            positionList={this.props.positionList}
            departmentList={this.props.departmentList}
            branchOptions={this.getBranchOptions(
              this.state.localDocument.bukrs,
            )}
            businessAreaOptions={this.getBusinessAreaOptions(
              this.state.localDocument.bukrs,
            )}
            directorOptions={this.getDirectorOptions(
              this.state.localDocument.branchId,
            )}
            managerOptions={this.getManagerOptions(
              this.state.localDocument.branchId,
            )}
            bukrsOptions={this.props.bukrsOptions}
            document={this.state.localDocument}
          />
        );
        break;
      default: {
      }
    }

    let modal;
    if (DOC_TYPE_CHANGE_SALARY === currentType) {
      modal = <SalaryListModal onSelect={this.handleStaffSelect} />;
    } else if (
      DOC_TYPE_TRANSFER === currentType ||
      DOC_TYPE_RECRUITMENT === currentType
    ) {
      modal = (
        <StaffF4Modal
          open={this.state.staffListModalOpened}
          messages={messages}
          closeModal={() => this.setState({ staffListModalOpened: false })}
          onStaffSelect={item => this.handleStaffSelect(item)}
          trans={'hr_doc_create_' + currentType}
          branchOptions={this.props.branchOptions}
          companyOptions={this.props.bukrsOptions}
          bukrsDisabledParent={false}
        />
      );
    } else if (DOC_TYPE_DISMISS === currentType) {
      modal = (
        <StaffF4Modal
          open={this.state.staffListModalOpened}
          messages={messages}
          closeModal={() => this.setState({ staffListModalOpened: false })}
          onStaffSelect={item => this.handleStaffSelect(item)}
          trans={'hr_doc_create_' + currentType}
          branchOptions={this.props.branchOptions}
          companyOptions={this.props.bukrsOptions}
          bukrsDisabledParent={false}
        />
      );
    } else if (DOC_TYPE_EXCLUDE_FROM_KPI === currentType) {
      modal = (
        <StaffF4Modal
          open={this.state.staffListModalOpened}
          messages={messages}
          closeModal={() => this.setState({ staffListModalOpened: false })}
          onStaffSelect={item => this.handleStaffSelect(item)}
          trans={'hr_doc_create_' + currentType}
          branchOptions={this.props.branchOptions}
          companyOptions={this.props.bukrsOptions}
          bukrsDisabledParent={false}
        />
      );
    }

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
            {pageTitle}
          </Header>

          {modal}
          <HrDocActions
            isUpdate={true}
            handleAction={this.handleAction}
            items={this.props.actions}
          />
        </Segment>
        <Divider clearing />

        {form}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    document: state.hrDocReducer.document,
    actions: state.hrDocReducer.actions,
    bukrsOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    staffListModalOpened: state.hrStaff.staffListModalOpened,
    managersByBranchOptions: state.hrStaff.managersByBranchOptions,
    directorsByBranchOptions: state.hrStaff.directorsByBranchOptions,
    allStaffs: state.hrStaff.allStaffs,
    allCurrentStaffs: state.hrStaff.allCurrentStaffs,
    departmentList: state.f4.departmentList,
    positionList: state.f4.positionList,
    businessAreaList: state.f4.businessAreaList,
    currencyList: state.f4.currencyList,
  };
}

export default connect(mapStateToProps, {
  blankDocument,
  toggleStaffListModal,
  createDocument,
  fetchAllDirectors,
  f4FetchPositionList,
  f4FetchBusinessAreaList,
  f4FetchDepartmentList,
  fetchAllManagers,
  toggleSalaryListModal,
  fetchAllCurrentStaffs,
  notify,
  f4FetchCurrencyList,
})(injectIntl(HrDocCreatePage));
