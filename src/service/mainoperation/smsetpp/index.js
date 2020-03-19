import React, { useState, useEffect } from 'react';
import { Segment, Dropdown, Button, Icon } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import './index.css';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import AddPrice from './AddPrice';
import format from 'string-format';
import { injectIntl } from 'react-intl';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import EditModal from './editPrice';
import {
  fetchSmsetpp,
  fetchSmsetppSearch,
  fetchSmsetppPremiumPriceType,
  fetchSmsetppType,
  clearDynObjService,
} from '../../serviceAction';
import OutputErrors from '../../../general/error/outputErrors';

const Smsetpp = props => {
  const {
    data,
    intl: { messages },
    countryList = [],
    companyOptions = [],
    f4FetchCountryList,
    fetchSmsetpp,
    fetchSmsetppSearch,
    fetchSmsetppPremiumPriceType,
    serviceType = [],
    fetchSmsetppType,
    clearDynObjService,
  } = props;
  const [error, setError] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const [modalOpen, setModalOpen] = useState(false);
  const language = localStorage.getItem('language');
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [typeOfService, setTypeOfService] = useState([]);
  const [secondActive, setSecondActive] = useState(false);
  const [serviceOptionPriceList, setServiceOptionPriceList] = useState([]);
  const [editWaers, setEditWaers] = useState('');
  const [editDocs, setEditDocs] = useState({
    id: 0,
    bukrs: '',
    dateStart: '',
    fc: 0,
    mc: 0,
    office: 0,
    master: 0,
    operator: 0,
    discount: 0,
    total: 0,
    countryId: 0,
    waersId: 0,
    serviceTypeId: 0,
    premiumPriceTypeId: 0,
  });
  const [countryOptions, setCountryOptions] = useState([]);
  let queryString = 'bukrs=={0.bukrs};countryId=={0.countryId}';

  const [search, setSearch] = useState({
    bukrs: 0,
    countryId: 0,
  });

  let query = {
    search: format(queryString, { ...search }),
  };

  useEffect(() => {
    clearDynObjService();
    fetchSmsetpp();
    f4FetchCountryList();
    fetchSmsetppPremiumPriceType();
    fetchSmsetppType();
  }, []);

  useEffect(() => {
    let country = countryList.map(item => {
      return {
        key: item.countryId,
        text: item.country,
        value: item.countryId,
        currencyid: item.currencyId,
        currency: item.currency,
      };
    });
    setCountryOptions(country);
  }, [countryList]);

  useEffect(() => {
    setServiceOptionPriceList(data.service);
  }, [data]);

  console.log('ServiceOptionPriceList', serviceOptionPriceList);
  useEffect(() => {
    let service = serviceType.map(item => {
      return { key: item.id, text: item.name, value: item.id };
    });
    setTypeOfService(service);
  }, [serviceType]);

  const onChange = (text, value) => {
    if (text === 'companyOptions') {
      setSearch({ ...search, bukrs: value });
      setActiveDropdown(true);
    }
    if (text === 'countries') {
      setSearch({ ...search, countryId: value });
      setSecondActive(true);
    }
  };

  const onClickButton = () => {
    save();
  };

  const validate = () => {
    const errors = [];
    if (!activeDropdown) {
      errors.push(errorTable[`5${language}`]);
    }
    if (!secondActive) {
      errors.push(errorTable[`147${language}`]);
    }
    if (errors.length === 0) {
      fetchSmsetppSearch(() => {
        fetchSmsetpp(query);
      });
    }
    return errors;
  };

  const save = () => {
    let errors = [];
    errors = validate();
    setError(() => errors);
  };

  const onModalOpen = documents => {
    let pr = null;
    let serviceTypeDoc = null;
    const bukr = companyOptions.find(({ text }) => text === documents.bukrs);
    const countr = countryOptions.find(
      ({ text }) => text === documents.countryId,
    );
    const serviceType = typeOfService.find(
      ({ text }) => text === documents.serviceTypeId,
    );
    if (serviceType !== undefined) {
      serviceTypeDoc = parseFloat(serviceType.value);
    } else {
      serviceTypeDoc = null;
    }

    if (documents.premiumPriceTypeId === messages['percentage']) {
      pr = pr + 1;
    } else if (documents.premiumPriceTypeId === messages['number']) {
      pr = pr + 2;
    } else {
      pr = null;
    }
    setModalOpen(true);

    return (
      setEditWaers(countr.currency),
      setEditDocs({
        id: documents.id,
        dateStart: documents.dateStart,
        fc: documents.fc,
        mc: documents.mc,
        office: documents.office,
        master: documents.master,
        operator: documents.operator,
        discount: documents.discount,
        total: documents.total,
        bukrs: bukr.value,
        countryId: countr.value,
        serviceTypeId: serviceTypeDoc,
        waersId: countr.currencyid,
        premiumPriceTypeId: pr,
      })
    );
  };

  return (
    <Segment>
      <EditModal
        param={search.bukrs !== 0 && search.countryId !== 0 ? query : null}
        documents={editDocs}
        open={modalOpen}
        waers={editWaers}
        cancel={() => setModalOpen(false)}
      />
      <div className="setting">
        <div className="flex-container">
          <h1>{messages['setting_prices_and_premium_services']}</h1>
          <AddPrice
            param={search.bukrs !== 0 && search.countryId !== 0 ? query : null}
          />
        </div>

        <Dropdown
          clearable="true"
          selection
          options={companyOptions}
          placeholder={messages['bukrs']}
          onChange={(e, { value }) => onChange('companyOptions', value)}
        />

        <Dropdown
          clearable="true"
          selection
          options={activeDropdown ? countryOptions : []}
          placeholder={messages['country']}
          id="secondDropdown"
          onChange={(e, { value }) => onChange('countries', value)}
        />
        <button
          className="ui blue inverted button"
          onClick={onClickButton}
          style={{ marginLeft: 30 }}
        >
          <i aria-hidden="true" className="search icon"></i>{' '}
          {messages['search']}
        </button>
        <OutputErrors errors={error} />
        <br></br>
        <br></br>
        <ReactTableWrapper
          data={serviceOptionPriceList}
          columns={[
            {
              Header: () => <div style={{ textAlign: 'center' }}>id</div>,
              accessor: 'id',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['bukrs']}</div>
              ),
              accessor: 'bukrs',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Task.StartDate']}
                </div>
              ),
              accessor: 'dateStart',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>FC</div>,
              accessor: 'fc',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>MC</div>,
              accessor: 'mc',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['office']}</div>
              ),
              accessor: 'office',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['master']}</div>
              ),
              accessor: 'master',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Operator']}
                </div>
              ),
              accessor: 'operator',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['discount']}
                </div>
              ),
              accessor: 'discount',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['totalAmount']}
                </div>
              ),
              accessor: 'total',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['country']}</div>
              ),
              accessor: 'countryId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['waers']}</div>
              ),
              accessor: 'waersId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['typeOfService']}
                </div>
              ),
              accessor: 'serviceTypeId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['typeOfAmount']}
                </div>
              ),
              accessor: 'premiumPriceTypeId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['toEdit']}</div>
              ),
              filterable: false,
              Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    icon
                    inverted
                    color="blue"
                    onClick={() => onModalOpen(row)}
                  >
                    <Icon name="edit"></Icon>
                  </Button>
                </div>
              ),
            },
          ]}
          defaultPageSize={10}
          showPagination={true}
          pageSizeOptions={[10, 20, 30, 40]}
        />
      </div>
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    premium: state.serviceReducer.dynamicObject.premiumPriceTypeId,
    data: state.serviceReducer.dynamicObject,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    serviceType: state.serviceReducer.dynamicObject.type,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  fetchSmsetpp,
  fetchSmsetppSearch,
  fetchSmsetppPremiumPriceType,
  fetchSmsetppType,
  clearDynObjService,
})(injectIntl(Smsetpp));
