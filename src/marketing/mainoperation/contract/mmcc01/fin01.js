//Contract payment schedule creation
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PriceListF4Modal from '../priceListF4';
import { handleFocus, moneyFormat } from '../../../../utils/helpers';
import { f4FetchSubCompanies } from '../../../../reference/f4/f4_action';
import { fetchDynObjMarketing } from '../../../marketingAction';
import {
  Segment,
  Table,
  Icon,
  Dropdown,
  Input,
  Label,
} from 'semantic-ui-react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const Fin01 = props => {
  const {
    bukrs,
    contractTypeId,
    branchId,
    ps = [],
    price,
    firstPayment,
    legalEntityId,
    dealerSubtract,
    tcode,
    contractDate,
    waers,
    paymentSchedule,
    priceList = [],
    language,
    intl: { messages },
    subCompanies = [],
  } = props;

  const [priceListF4ModalOpen, setPriceListF4ModalOpen] = useState(false);
  const [subCompaniesOptions, setSubCompaniesOptions] = useState([]);
  const [isLoadingPriceList, setIsLoadingPriceList] = useState(false);

  //componentDidMount
  useEffect(() => {
    //get Sub companies
    props.f4FetchSubCompanies();
  }, []);

  //componentWillRecieveProps
  useEffect(() => {
    //make Sub companies options
    if (
      bukrs &&
      bukrs.length === 4 &&
      subCompanies &&
      subCompanies.length > 0
    ) {
      let waSubCompaniesOptions = subCompanies
        .filter(item => item.bukrs === bukrs)
        .sort((a, b) => (a.nameRu > b.nameRu ? 1 : -1))
        .map(item => {
          return {
            key: item.id,
            value: item.id,
            text: item.nameRu,
          };
        });

      setSubCompaniesOptions(waSubCompaniesOptions);
    }
  }, [bukrs]);

  //componentWillRecieveProps
  useEffect(() => {
    //get Price List
    if (branchId && branchId > 0 && contractTypeId && contractTypeId > 0) {
      props.fetchDynObjMarketing(
        'marketing/contract/priceListF4/fetch_price_list',
        { bukrs, tcode, branchId, contractTypeId },
        bool => setIsLoadingPriceList(bool),
      );
    }
  }, [branchId, contractTypeId]);

  const paymentScheduleOutput = () => {
    let count = 0;
    // console.log('paymentSchedule',ps)
    return (
      <Segment padded size="small">
        <Label color="blue" ribbon>
          {messages['paymentSchedule']}
        </Label>
        <Table collapsing>
          <Table.Body>
            {ps.map(item => {
              const {
                isFirstPayment,
                paymentDate,
                sum2,
                paymentScheduleId,
              } = item;
              count += 1;
              return (
                <Table.Row key={paymentScheduleId}>
                  <Table.Cell>
                    {isFirstPayment == '1'
                      ? messages['firstPayment']
                      : count - 1}
                  </Table.Cell>
                  <Table.Cell>
                    <DatePicker
                      className="date-auto-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={
                        paymentDate ? moment(paymentDate, 'DD.MM.YYYY') : ''
                      }
                      onChange={(e, { value }) =>
                        props.onFinInputChange(
                          e,
                          'paymentDate',
                          paymentScheduleId,
                        )
                      }
                      locale={language}
                      disabled={paymentScheduleId !== 1}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      color="teal"
                      label={waers}
                      labelPosition="left"
                      value={moneyFormat(sum2)}
                      maxLength="18"
                      onFocus={handleFocus}
                      onChange={(e, { value }) =>
                        props.onFinInputChange(value, 'sum2', paymentScheduleId)
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Segment>
    );
  };

  return (
    <div>
      <PriceListF4Modal
        open={priceListF4ModalOpen}
        priceList={priceList}
        onClosePriceListF4={bool => setPriceListF4ModalOpen(bool)}
        onPriceSelect={item => props.onFinInputChange(item, 'price', '')}
        isLoadingPriceList={isLoadingPriceList}
      />

      <Segment padded size="small">
        <Label color="orange" ribbon>
          {messages['finance']}
        </Label>
        <Table collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{messages['registeredTo']}</Table.Cell>
              <Table.Cell>
                <Dropdown
                  search
                  noResultsMessage={messages['noResultsMessage']}
                  selection
                  options={subCompaniesOptions}
                  value={legalEntityId}
                  onChange={(e, { value }) => {
                    props.onFinInputChange(value, 'legalEntityId', '');
                  }}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['price']}</Table.Cell>
              <Table.Cell>
                <Input
                  color="teal"
                  label={waers}
                  labelPosition="left"
                  value={moneyFormat(price)}
                  maxLength="18"
                />
                <Icon
                  name="clone"
                  size="large"
                  className="clickableIcon"
                  disabled={contractDate ? false : true}
                  onClick={() => setPriceListF4ModalOpen(true)}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['minPrepayment']}</Table.Cell>
              <Table.Cell>
                <Input
                  color="teal"
                  label={waers}
                  labelPosition="left"
                  value={moneyFormat(firstPayment)}
                  maxLength="18"
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['remainder']}</Table.Cell>
              <Table.Cell>
                <Input
                  color="teal"
                  label={waers}
                  labelPosition="left"
                  value={moneyFormat(price - firstPayment)}
                  maxLength="18"
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['dealerDiscount']}</Table.Cell>
              <Table.Cell>
                <Input
                  color="teal"
                  label={waers}
                  labelPosition="left"
                  value={moneyFormat(dealerSubtract)}
                  maxLength="18"
                  onFocus={handleFocus}
                  onChange={(e, { value }) =>
                    props.onFinInputChange(value, 'dealerSubtract', '')
                  }
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        {paymentScheduleOutput()}
      </Segment>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    language: state.locales.lang,
    subCompanies: state.f4.subCompanies,
    priceList: state.marketing.dynamicObject.priceList,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchSubCompanies,
    fetchDynObjMarketing,
  },
)(injectIntl(Fin01));
