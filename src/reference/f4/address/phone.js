import React, { useState, useEffect } from 'react';
import { Icon, Table, Button, Label, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  f4FetchCountryList,
  f4FetchPhone,
  f4FetchPhoneType,
} from '../f4_action';

import PhoneF4HistoryModal from '../phone/phoneF4HistoryModal';
import PhoneF4CreateModal from '../phone/phoneF4CreateModal';
import PhoneF4UpdateModal from '../phone/phoneF4UpdateModal';
import PhoneF4DeleteModal from '../phone/phoneF4DeleteModal';

function Phone(props) {
  const emptyList = {
    selectedPhone: {},
  };
  const [list, setList] = useState({ ...emptyList });
  // const [activeIndex, setActiveIndex] = useState(0);
  const [phoneF4HistoryModalOpen, setPhoneF4HistoryModalOpen] = useState(false);
  const [phoneF4CreateModalOpen, setPhoneF4CreateModalOpen] = useState(false);
  const [phoneF4UpdateModalOpen, setPhoneF4UpdateModalOpen] = useState(false);
  const [phoneF4DeleteModalOpen, setPhoneF4DeleteModalOpen] = useState(false);

  const {
    intl: { messages },
    phoneList = [],
    phoneListType = [],
    countryList = [],
    customerId,
    countryId,
    language,
  } = props;

  const lang = language.charAt(0).toUpperCase() + language.slice(1);

  useEffect(() => {
    props.f4FetchCountryList();
    props.f4FetchPhoneType();
  }, []);
  useEffect(() => {
    if (customerId) {
      props.f4FetchPhone({ search: `customerId==${customerId}` });
    }
  }, [customerId]);

  const onPhoneSelect = value => {
    setList({ ...list, selectedPhone: value });
  };

  const phone = phoneList.map((phone, key) => {
    if (phone.customerId === customerId) {
      const pl = phoneListType.map(type => {
        if (phone.typeId === type.id) {
          return (
            <Table.Row key={key}>
              <Table.Cell>
                <label>{type[`name${lang}`]}</label>
              </Table.Cell>
              <Table.Cell>
                <label>{phone.phone}</label>
              </Table.Cell>
              <Table.Cell collapsing textAlign="center">
                <Button
                  basic
                  color="blue"
                  icon
                  onClick={() => {
                    onPhoneSelect(phone);
                    setPhoneF4UpdateModalOpen(true);
                  }}
                >
                  <Icon name="pencil" />
                </Button>
                <Button
                  basic
                  color="red"
                  icon
                  onClick={() => {
                    onPhoneSelect(phone);
                    setPhoneF4DeleteModalOpen(true);
                  }}
                >
                  <Icon name="delete" />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        }
      });
      return pl;
    }
  });
  const label = (
    <Table.Row>
      <Table.Cell></Table.Cell>
      <Table.Cell textAlign="center">
        <Label basic color="red">
          {messages['choose_client']}
        </Label>
      </Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  );

  // const close = () => {
  //   props.onClosePhoneF4(false);
  // };
  return (
    <div>
      <PhoneF4HistoryModal
        open={phoneF4HistoryModalOpen}
        customerId={customerId}
        phoneListType={phoneListType}
        onCloseHistoryPhoneF4={bool => setPhoneF4HistoryModalOpen(bool)}
        lang={lang}
      />
      <PhoneF4CreateModal
        open={phoneF4CreateModalOpen}
        customerId={customerId}
        phoneList={phoneList}
        country={getCountry(countryList, countryId)}
        phoneListType={phoneListType}
        onCloseCreatePhoneF4={bool => setPhoneF4CreateModalOpen(bool)}
        lang={lang}
      />
      <PhoneF4UpdateModal
        open={phoneF4UpdateModalOpen}
        customerId={customerId}
        phoneList={phoneList}
        country={getCountry(countryList, countryId)}
        phoneListType={phoneListType}
        selectedPhone={list.selectedPhone}
        //onPhoneSelect={(item, phone) => onPhoneSelect(item, phone)}
        onCloseUpdatePhoneF4={bool => setPhoneF4UpdateModalOpen(bool)}
        lang={lang}
      />
      <PhoneF4DeleteModal
        open={phoneF4DeleteModalOpen}
        selectedPhone={list.selectedPhone}
        onCloseDeletePhoneF4={bool => setPhoneF4DeleteModalOpen(bool)}
      />

      <Header>
        <Icon name="text telephone" size="big" />
        {messages['contactDetails']}
      </Header>
      <Table striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{messages['phone_type']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.PhoneNumber']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['editing']}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{customerId ? phone : label}</Table.Body>
      </Table>
      <Segment>
        <Button
          size="small"
          icon
          color="teal"
          labelPosition="left"
          onClick={() => {
            if (!customerId) {
              return;
            }
            setPhoneF4HistoryModalOpen(true);
          }}
        >
          <Icon name="history" />
          {messages['history']}
        </Button>
        <Button
          icon
          labelPosition="left"
          primary
          size="small"
          onClick={() => {
            if (!customerId) {
              return;
            }
            setPhoneF4CreateModalOpen(true);
          }}
        >
          <Icon name="phone" /> {messages['add_number']}
        </Button>
      </Segment>
    </div>
  );
}

const getCountry = (countryList, countryId) => {
  let selectedCountry = {};
  for (let i = 0; i < countryList.length; i++) {
    if (countryList[i].countryId === countryId) {
      selectedCountry = countryList[i];
    }
  }
  return selectedCountry;
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    phoneList: state.f4.phoneList.data,
    phoneListType: state.f4.phoneType.data,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchPhone,
  f4FetchPhoneType,
})(injectIntl(Phone));
