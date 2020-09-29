import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Table,
  Dropdown,
  Icon,
  Grid,
  Segment,
  Input,
  Checkbox,
  TextArea,
  Label,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './fa.css';

import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../utils/helpers';

require('moment/locale/tr');
require('moment/locale/ru');

const FaHeader = props => {
  const {
    bkpf = {},

    companyOptions = [],
    branchOptions = [],
    departmentOptions = [],
    businessAreaOptions = [],
    currencyOptions = [],

    exRateNational = {},
    intl: { messages },
    language,
  } = props;

  const onInputChange = (value, stateFieldName) => {
    const wabkpf = Object.assign({}, bkpf);
    if (stateFieldName === 'official') {
      wabkpf[stateFieldName] = !wabkpf[stateFieldName];
    } else if (stateFieldName === 'waers') {
      let waRate = 0;
      waRate = exRateNational[value] ? exRateNational[value] : 0;
      if (value === 'USD') {
        waRate = 1;
      }
      if (waRate === null || waRate === undefined) {
        waRate = 0;
      }
      wabkpf.kursf = waRate;
      wabkpf[stateFieldName] = value;
    } else if (stateFieldName === 'budat' || stateFieldName === 'bldat') {
      if (value !== null && value !== undefined) {
        wabkpf[stateFieldName] = value;
      } else wabkpf[stateFieldName] = '';
    } else if (stateFieldName === 'bukrs') {
      wabkpf[stateFieldName] = value;
      wabkpf['brnch'] = '';
    } else {
      wabkpf[stateFieldName] = value;
    }

    props.changefaBkpf(wabkpf);
  };

  // let wabkpf = Object.assign({}, bkpf);

  const {
    bukrs,
    brnch,
    business_area_id,
    dep,
    budat = moment().format('YYYY-MM-DD'),
    bldat = moment().format('YYYY-MM-DD'),
    blart,
    waers,
    kursf,
    bktxt,
    official,
    zreg,
  } = props.bkpf;

  const {
    bukrsInfo,
    brnchInfo,
    business_area_idInfo,
    depInfo,
    budatInfo,
    bldatInfo,
    blartInfo,
    waersInfo,
    kursfInfo,
    bktxtInfo,
    officialInfo,
    zregInfo,
  } = props.bkpfInfo;
  // console.log(language, 'language');
  return (
    <Segment padded size="small">
      <Label color="blue" ribbon>
        {messages['header']}
      </Label>
      <Grid columns={3} stackable>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="folder" /> {messages['bukrs']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      noResultsMessage={messages['noResultsMessage']}
                      placeholder={messages['bukrs']}
                      selection
                      options={companyOptions}
                      value={bukrs}
                      onChange={(e, { value }) => onInputChange(value, 'bukrs')}
                      readOnly={
                        bukrsInfo
                          ? bukrsInfo.readOnly
                            ? bukrsInfo.readOnly
                            : false
                          : false
                      }
                      disabled={
                        bukrsInfo
                          ? bukrsInfo.disabled
                            ? bukrsInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="browser" />
                    {messages['brnch']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      noResultsMessage={messages['noResultsMessage']}
                      placeholder={messages['brnch']}
                      search
                      selection
                      options={
                        branchOptions
                          ? branchOptions[bukrs]
                            ? branchOptions[bukrs]
                            : []
                          : []
                      }
                      value={brnch}
                      onChange={(e, { value }) => onInputChange(value, 'brnch')}
                      disabled={
                        brnchInfo
                          ? brnchInfo.disabled
                            ? brnchInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="browser" />
                    {messages['business_area']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      noResultsMessage={messages['noResultsMessage']}
                      placeholder={messages['business_area']}
                      search
                      selection
                      options={
                        bukrs
                          ? businessAreaOptions
                            ? businessAreaOptions[bukrs]
                              ? businessAreaOptions[bukrs]
                              : []
                            : []
                          : []
                      }
                      value={business_area_id}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'business_area_id')
                      }
                      disabled={
                        business_area_idInfo
                          ? business_area_idInfo.disabled
                            ? business_area_idInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>{messages['official']}</Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      checked={official}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'official')
                      }
                      readOnly={
                        officialInfo
                          ? officialInfo.readOnly
                            ? officialInfo.readOnly
                            : false
                          : false
                      }
                      disabled={
                        officialInfo
                          ? officialInfo.disabled
                            ? officialInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="browser" /> {messages['dep']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      noResultsMessage={messages['noResultsMessage']}
                      placeholder={messages['dep']}
                      search
                      selection
                      options={departmentOptions}
                      value={dep}
                      onChange={(e, { value }) => onInputChange(value, 'dep')}
                      disabled={
                        depInfo
                          ? depInfo.disabled
                            ? depInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="dollar" />
                    {messages['waers']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      noResultsMessage={messages['noResultsMessage']}
                      placeholder={messages['waers']}
                      search
                      selection
                      options={currencyOptions}
                      value={waers}
                      onChange={(e, { value }) => onInputChange(value, 'waers')}
                      disabled={
                        waersInfo
                          ? waersInfo.disabled
                            ? waersInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="exchange" />
                    {messages['kursf']}
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      value={kursf}
                      placeholder={messages['kursf']}
                      onChange={(e, { value }) => onInputChange(value, 'kursf')}
                      readOnly={
                        kursfInfo
                          ? kursfInfo.readOnly
                            ? kursfInfo.readOnly
                            : false
                          : false
                      }
                      disabled={
                        kursfInfo
                          ? kursfInfo.disabled
                            ? kursfInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="wordpress forms" />
                    {messages['zreg']}
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      value={zreg}
                      maxLength="10"
                      placeholder={messages['zreg']}
                      onChange={(e, { value }) => onInputChange(value, 'zreg')}
                      readOnly={
                        zregInfo
                          ? zregInfo.readOnly
                            ? zregInfo.readOnly
                            : false
                          : false
                      }
                      disabled={
                        zregInfo
                          ? zregInfo.disabled
                            ? zregInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="square outline" />
                    {messages['blart']}
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      value={blart}
                      placeholder={messages['blart']}
                      readOnly={
                        blartInfo
                          ? blartInfo.readOnly
                            ? blartInfo.readOnly
                            : false
                          : false
                      }
                      disabled={
                        blartInfo
                          ? blartInfo.disabled
                            ? blartInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="calendar" />
                    {messages['budat']}
                  </Table.Cell>
                  <Table.Cell>
                    <DatePicker
                      className="date-auto-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={stringYYYYMMDDToMoment(budat)}
                      locale={language}
                      onChange={event =>
                        onInputChange(momentToStringYYYYMMDD(event), 'budat')
                      }
                      dateFormat="DD.MM.YYYY"
                      readOnly={
                        budatInfo
                          ? budatInfo.readOnly
                            ? budatInfo.readOnly
                            : false
                          : false
                      }
                      disabled={
                        budatInfo
                          ? budatInfo.disabled
                            ? budatInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="calendar" />
                    {messages['bldat']}
                  </Table.Cell>
                  <Table.Cell>
                    <DatePicker
                      className="date-auto-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={stringYYYYMMDDToMoment(bldat)}
                      locale={language}
                      onChange={event =>
                        onInputChange(momentToStringYYYYMMDD(event), 'bldat')
                      }
                      dateFormat="DD.MM.YYYY"
                      readOnly={
                        bldatInfo
                          ? bldatInfo.readOnly
                            ? bldatInfo.readOnly
                            : false
                          : false
                      }
                      disabled={
                        bldatInfo
                          ? bldatInfo.disabled
                            ? bldatInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Icon name="comments outline" />
                    {messages['bktxt']}
                  </Table.Cell>

                  <Table.Cell>
                    <TextArea
                      style={{
                        maxHeight: 45,
                        minHeight: 45,
                        minWidth: 180,
                        maxWidth: 180,
                      }}
                      value={bktxt}
                      maxLength="255"
                      onChange={(e, { value }) => onInputChange(value, 'bktxt')}
                      placeholder={messages['bktxt']}
                      readOnly={
                        bktxtInfo
                          ? bktxtInfo.readOnly
                            ? bktxtInfo.readOnly
                            : false
                          : false
                      }
                      disabled={
                        bktxtInfo
                          ? bktxtInfo.disabled
                            ? bktxtInfo.disabled
                            : false
                          : false
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state');
  return {
    language: state.locales.lang,
  };
}

export default connect(mapStateToProps, {})(injectIntl(FaHeader));
