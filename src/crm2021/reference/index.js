import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment, Tab, Container } from 'semantic-ui-react';
import TabSubjectAppeal from './components/TabSubjectAppeal';
import TabSourceRequests from './components/TabSourceRequests';
import TabSourceVacancies from './components/TabSourceVacancies';
import TabCategoryHits from './components/TabCategory';
import TabReasonsContact from './components/TabReasonsContact';
import TabPresets from './components/TabPresent';
import TabVacancies from './components/TabVacancies';
import { injectIntl } from 'react-intl';
import './crmreference.css';
import {
  // Тема обращения
  createSubjectAppeal,
  fetchSubjectAppeal,
  updateSubjectAppeal,
  //Источники
  createSource,
  fetchSource,
  updateSource,
  //
  createReasonContract,
  fetchReasonContract,
  updateReasonContract,
  //
  createPresent,
  fetchPresent,
  updatePresent,
  //Категории
  createCategory,
  fetchCategory,
  updateCategory,
  //Категории
  createVacancy,
  fetchVacancy,
  updateVacancy,
} from './crmreferenceAction';
import TabPresent from './components/TabPresent';
import TabCategory from './components/TabCategory';

const CrmReference = props => {
  const {
    subjectAppealList = [],
    sourceRequestsList = [],
    sourceVacanciesList = [],
    reasonContractList = [],
    presentList = [],
    categoryList = [],
    vacancyList = [],
  } = props;
  const [activeTab, setActiveTab] = useState(0);
  const initialCrudData = {
    headerText: '',
    data: [],
  };
  const [crudData, setCrudData] = useState(initialCrudData);
  const sortData = arr => {
    return arr.sort((a, b) => (a.id > b.id ? 1 : -1));
  };

  const panes = [
    {
      menuItem: 'Тема обращения',
      render: () => (
        <Tab.Pane>
          <TabSubjectAppeal
            data={sortData(subjectAppealList)}
            crudData={crudData}
            get={props.fetchSubjectAppeal}
            create={props.createSubjectAppeal}
            update={props.updateSubjectAppeal}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Источник обращений',
      render: () => (
        <Tab.Pane>
          <TabSourceRequests
            data={sortData(sourceRequestsList)}
            crudData={crudData}
            get={props.fetchSource}
            create={props.createSource}
            update={props.updateSource}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Источник вакансий',
      render: () => (
        <Tab.Pane>
          <TabSourceVacancies
            data={sortData(sourceVacanciesList)}
            crudData={crudData}
            get={props.fetchSource}
            create={props.createSource}
            update={props.updateSource}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Категория обращений',
      render: () => (
        <Tab.Pane>
          <TabCategory
            data={sortData(categoryList)}
            crudData={crudData}
            get={props.fetchCategory}
            create={props.createCategory}
            update={props.updateCategory}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Причины обращения',
      render: () => (
        <Tab.Pane>
          <TabReasonsContact
            data={sortData(reasonContractList)}
            crudData={crudData}
            get={props.fetchReasonContract}
            create={props.createReasonContract}
            update={props.updateReasonContract}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Подарки',
      render: () => (
        <Tab.Pane>
          <TabPresent
            data={sortData(presentList)}
            crudData={crudData}
            get={props.fetchPresent}
            create={props.createPresent}
            update={props.updatePresent}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Вакансии',
      render: () => (
        <Tab.Pane>
          <TabVacancies
            data={sortData(vacancyList)}
            crudData={crudData}
            get={props.fetchVacancy}
            create={props.createVacancy}
            update={props.updateVacancy}
          />
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    if (activeTab === 0) {
      props.fetchSubjectAppeal();
      setCrudData({ ...crudData, headerText: 'Тема обращения' });
    } else if (activeTab === 1) {
      props.fetchSource({ type: 'APPLICATION' });
      setCrudData({ ...crudData, headerText: 'Источники' });
    } else if (activeTab === 2) {
      props.fetchSource({ type: 'VACANCY' });
      setCrudData({ ...crudData, headerText: 'Источник вакансий' });
    } else if (activeTab === 3) {
      props.fetchCategory();
      setCrudData({ ...crudData, headerText: 'Категория обращений' });
    } else if (activeTab === 4) {
      props.fetchReasonContract();
      setCrudData({ ...crudData, headerText: 'Причины обращения' });
    } else if (activeTab === 5) {
      props.fetchPresent();
      setCrudData({ ...crudData, headerText: 'Подарки' });
    } else if (activeTab === 6) {
      props.fetchVacancy();
      setCrudData({ ...crudData, headerText: 'Вакансии' });
    }
  }, [activeTab]);

  return (
    <Container
      fluid
      style={{
        paddingLeft: '1em',
        paddingRight: '1em',
      }}
    >
      <Segment size="mini">
        <h3>CRM 2021 Справочники</h3>
      </Segment>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuposition="right"
        panes={panes}
        onTabChange={(event, { activeIndex }) => {
          setActiveTab(activeIndex);
        }}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    subjectAppealList: state.crmreferenceReducer.subjectAppealList,
    sourceRequestsList: state.crmreferenceReducer.sourceRequestsList,
    sourceVacanciesList: state.crmreferenceReducer.sourceVacanciesList,
    reasonContractList: state.crmreferenceReducer.reasonContractList,
    presentList: state.crmreferenceReducer.presentList,
    categoryList: state.crmreferenceReducer.categoryList,
    vacancyList: state.crmreferenceReducer.vacancyList,
  };
}

export default connect(mapStateToProps, {
  //Тема обращения
  fetchSubjectAppeal,
  createSubjectAppeal,
  updateSubjectAppeal,
  //Источники
  createSource,
  fetchSource,
  updateSource,

  //Источник обращения
  createReasonContract,
  fetchReasonContract,
  updateReasonContract,
  //Подарки
  createPresent,
  fetchPresent,
  updatePresent,
  //Категории
  createCategory,
  fetchCategory,
  updateCategory,
  //Категории
  createVacancy,
  fetchVacancy,
  updateVacancy,
})(injectIntl(CrmReference));
