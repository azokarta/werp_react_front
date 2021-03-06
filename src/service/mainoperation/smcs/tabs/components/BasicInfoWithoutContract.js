import React from 'react';
import { Table, Input, Form, TextArea } from 'semantic-ui-react';
import DropdownClearable from '../../../../../utils/DropdownClearable';
import moment from 'moment';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../../../utils/helpers';
import DatePicker from 'react-datepicker';

const BasicInfoWithoutContract = props => {
  const {
    data = {},
    operatorOptions = [],
    onBasicInfoInputChange,
    companyOptions,
    branchOptions = [],
    categoryOptions,
    tovarOptions,
    masterOptions,
  } = props;
  const lang = localStorage.getItem('language');
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Номер заявки</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              fluid
              readOnly
              value={
                data.applicationNumber === null ? '' : data.applicationNumber
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Form.Field required>
              <label>Компания</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DropdownClearable
              allSelect={false}
              value={data.bukrs ? data.bukrs : ''}
              options={companyOptions}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectCompany')
              }
              handleClear={(e, value) =>
                onBasicInfoInputChange(value, 'clearBukrs')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Form.Field required>
              <label>Филиал</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DropdownClearable
              allSelect={false}
              value={data.branchId ? data.branchId : ''}
              options={branchOptions}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectBranch')
              }
              handleClear={(e, value) =>
                onBasicInfoInputChange(value, 'clearBranch')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Клиент</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.customerFullName} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width={4}>Заводской номер</Table.Cell>
          <Table.Cell width={12}>
            <Input fluid readOnly value={data.customerFullName} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Form.Field required>
              <label>Категория</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DropdownClearable
              allSelect={false}
              value={data.categoryId}
              options={categoryOptions}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectCategory')
              }
              handleClear={(e, value) =>
                onBasicInfoInputChange(value, 'clearCategory')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Form.Field required>
              <label>Продукт</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DropdownClearable
              allSelect={false}
              value={data.tovarId}
              options={tovarOptions}
              onChange={(e, value) =>
                onBasicInfoInputChange(value, 'selectTovar')
              }
              handleClear={(e, value) =>
                onBasicInfoInputChange(value, 'clearTovar')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>CN</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.contractNumber} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Адрес</Table.Cell>
          <Table.Cell>
            <Input fluid readOnly value={data.address} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Дата покупки</Table.Cell>
          <Table.Cell>
            <Input
              fluid
              readOnly
              value={
                data.contractDate
                  ? moment(data.contractDate).format('DD.MM.YYYY')
                  : ''
              }
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
            <Form.Field required>
              <label>Мастер</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DropdownClearable
              allSelect={false}
              value={data.masterId ? data.masterId : ''}
              options={masterOptions}
              onChange={(e, { value }) =>
                onBasicInfoInputChange(value, 'selectMaster')
              }
              handleClear={(e, item) =>
                onBasicInfoInputChange(item, 'clearMaster')
              }
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
            <Form.Field>
              <label>Оператор</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DropdownClearable
              allSelect={false}
              value={data.operatorId ? data.operatorId : ''}
              options={operatorOptions}
              onChange={(e, { value }) =>
                onBasicInfoInputChange(value, 'selectOperator')
              }
              handleClear={(e, item) =>
                onBasicInfoInputChange(item, 'clearOperator')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Form.Field>
              <label>Дата сервиса</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell>
            <DatePicker
              autoComplete="off"
              dateFormat="DD.MM.YYYY"
              selected={
                data.serviceDate ? stringYYYYMMDDToMoment(data.serviceDate) : ''
              }
              dropdownMode="select"
              locale={lang}
              onChange={date =>
                onBasicInfoInputChange(
                  momentToStringYYYYMMDD(date),
                  'changeServiceDate',
                )
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Срок гарантии</Table.Cell>
          <Table.Cell className="tableRow">
            <Input
              readOnly
              value={
                data.warrantyPeriodDate
                  ? moment(data.warrantyPeriodDate).format('DD.MM.YYYY')
                  : ''
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Срок гарантии в месяц</Table.Cell>
          <Table.Cell>
            <Input
              readOnly
              value={
                data.warrantyPeriodInMonth ? data.warrantyPeriodInMonth : ''
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Form.Field>
              <label>Примечание</label>
            </Form.Field>
          </Table.Cell>
          <Table.Cell className="tableRow">
            <TextArea
              placeholder="Примечание"
              value={data.info ? data.info : ''}
              onChange={(e, o) => onBasicInfoInputChange(o, 'infoChange')}
              style={{ minHeight: 100 }}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default BasicInfoWithoutContract;
