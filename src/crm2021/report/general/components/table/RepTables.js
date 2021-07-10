import React from 'react';
import { Table, Icon, Label, Message } from 'semantic-ui-react';
import { MONTH_OPTIONS } from '../../../../../utils/constants';
import moment from 'moment';
import DemoResultLabel from '../../../../mainoperation/demo/components/DemoResultLabel';
import { REP_894, REP_934, REP_935 } from '../../crmRepUtil';
import { RECO_CATEGORY_COLORS, RECO_CATEGORIES } from '../../../../crmUtil';
import {
  renderRecoCategoryBtn,
  renderRecoCategoryAsQty,
} from '../../../../CrmHelper';
import '../../css/repStyle.css';
/**
 *Отчет Демо/Продажа
 */
export function RepTable894And934(props) {
  let { items, transactionId } = props;
  if (!items) {
    items = [];
  }
  const months = [];
  let mCounter = 0;
  let date = moment();
  while (true) {
    let tempMonth = parseInt(date.format('M'), 10);
    if (tempMonth === 8 || tempMonth === 1) {
    } else {
      months.push(tempMonth);
      mCounter++;
    }

    date = date.subtract(1, 'month');
    if (mCounter === 4) {
      break;
    }
  }

  const renderMonthDataForSale = monthData => {
    monthData = monthData || {};
    return months.map(m => {
      const md = monthData[m];

      return [
        <Table.Cell
          key={m}
          width={1}
          className={md ? md.demoSaleLevelClass : ''}
        >
          {md ? `${md.demoCount}/${md.saleCount}` : ''}
        </Table.Cell>,
        <Table.Cell
          key={`${m}avg`}
          width={1}
          className={md ? md.demoSaleLevelClass : ''}
        >
          {md ? md.demoSaleAvg : ''}
        </Table.Cell>,
        <Table.Cell key={`${m}d`} className={md ? md.demoSaleLevelClass : ''}>
          {md ? `${md.demoSaleLevel}-уровень` : 'Нет данных'}
        </Table.Cell>,
      ];
    });
  };

  const renderMonthDataForReco = monthData => {
    monthData = monthData || {};
    return months.map(m => {
      const md = monthData[m];

      return [
        <Table.Cell
          key={m}
          width={1}
          className={md ? md.demoRecoLevelClass : ''}
        >
          {md ? `${md.demoCount}/${md.recoCount}` : ''}
        </Table.Cell>,
        <Table.Cell
          key={`${m}avg`}
          width={1}
          className={md ? md.demoRecoLevelClass : ''}
        >
          {md ? md.recoSaleAvg : ''}
        </Table.Cell>,
        <Table.Cell key={`${m}d`} className={md ? md.demoRecoLevelClass : ''}>
          {md ? `${md.demoRecoLevel}-уровень` : 'Нет данных'}
        </Table.Cell>,
      ];
    });
  };

  const renderMonthDataForDemo = monthData => {
    monthData = monthData || {};
    return months.map(m => {
      const md = monthData[m];
      return [
        <Table.Cell key={m} width={1} className={md ? md.demoLevelClass : ''}>
          {md ? md.demoCount : ''}
        </Table.Cell>,
        <Table.Cell key={`${m}d`} className={md ? md.demoLevelClass : ''}>
          {md ? `${md.demoLevel}-уровень` : 'Нет данных'}
        </Table.Cell>,
      ];
    });
  };

  const colSpan = transactionId === REP_935 ? 2 : 3;
  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Филиал</Table.HeaderCell>
          {months.map(m => (
            <Table.HeaderCell colSpan={colSpan} key={m}>
              {MONTH_OPTIONS[m - 1] ? MONTH_OPTIONS[m - 1].text : ''}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map(item => (
          <Table.Row key={item.contextId}>
            <Table.Cell>{item.contextName}</Table.Cell>
            {transactionId === REP_894
              ? renderMonthDataForSale(item.monthData)
              : transactionId === REP_934
              ? renderMonthDataForReco(item.monthData)
              : renderMonthDataForDemo(item.monthData)}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export function RepTable894(props) {
  return (
    <div>
      <RepTable894And934
        transactionId={props.transactionId}
        items={props.items}
      />
      <RepTable894Descriptions />
    </div>
  );
}

export function RepTable894Descriptions() {
  return (
    <div className="ui info message" style={{ width: '300px' }}>
      <span>1-й уровень: 1/1 - 7/1 </span>
      <br />
      <span>2-й уровень: 8/1 - 10/1 </span>
      <br />
      <span>3-й уровень: 11/1 и больше </span>
    </div>
  );
}

export function RepTable934(props) {
  return (
    <div>
      <RepTable894And934
        transactionId={props.transactionId}
        items={props.items}
      />
      <RepTable934Descriptions />
    </div>
  );
}

export function RepTable934Descriptions() {
  return (
    <div className="ui info message" style={{ width: '300px' }}>
      <span>1-й уровень: 1/10 и больше </span>
      <br />
      <span>2-й уровень: 1/9 - 1/7 </span>
      <br />
      <span>3-й уровень: 1/6 и меньше </span>
    </div>
  );
}

export function RepTable935(props) {
  return (
    <div>
      <RepTable894And934
        transactionId={props.transactionId}
        items={props.items}
      />
      <RepTable935Descriptions />
    </div>
  );
}

export function RepTable935Descriptions() {
  return (
    <div className="ui info message" style={{ width: '300px' }}>
      <span>1-й уровень: 25 и больше </span>
      <br />
      <span>2-й уровень: 24 - 20 </span>
      <br />
      <span>3-й уровень: 19 и меньше </span>
    </div>
  );
}

export function RepTable914(props) {
  let { items } = props;
  if (!items) {
    items = [];
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ФИО</Table.HeaderCell>
          <Table.HeaderCell>Золото</Table.HeaderCell>
          <Table.HeaderCell>Серебро</Table.HeaderCell>
          <Table.HeaderCell>Бронза</Table.HeaderCell>
          <Table.HeaderCell>Железо</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map(item => (
          <Table.Row key={item.staffId}>
            <Table.Cell>{item.staffName}</Table.Cell>
            {RECO_CATEGORIES.map(cat => (
              <Table.Cell key={cat.key}>
                {renderRecoCategoryAsQty(cat.key, item.recos[cat.key] || 0)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export function RepTable740(props) {
  let { items } = props;
  if (!items) {
    items = [];
  }

  const renderRecos = item => (
    <Label.Group>
      <Label>
        Всего
        <Label.Detail>{item.recoCount}</Label.Detail>
      </Label>
      {item.recosByCategory.map(rc => (
        <Label
          basic
          title={rc.name}
          key={rc.id}
          color={RECO_CATEGORY_COLORS[rc.id]}
        >
          {rc.count}
        </Label>
      ))}
    </Label.Group>
  );

  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={2}>Дилер</Table.HeaderCell>
          <Table.HeaderCell width={2}>Категория</Table.HeaderCell>
          <Table.HeaderCell width={2}>Дата-время</Table.HeaderCell>
          <Table.HeaderCell width={2}>Результат</Table.HeaderCell>
          <Table.HeaderCell width={3}>Кол. рек.</Table.HeaderCell>
          <Table.HeaderCell width={4}>Примечание директора</Table.HeaderCell>
          <Table.HeaderCell width={1} />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.staffName}</Table.Cell>
            <Table.Cell>{renderRecoCategoryBtn(item.categoryId)}</Table.Cell>

            <Table.Cell>{item.dateTime}</Table.Cell>
            <Table.Cell>
              <DemoResultLabel
                resultId={item.resultId}
                resultName={item.resultName}
              />
            </Table.Cell>
            <Table.Cell>{renderRecos(item)}</Table.Cell>
            <Table.Cell>
              {item.directorNote ? (
                <Message compact size="small">
                  {item.directorNote}
                </Message>
              ) : (
                ''
              )}
            </Table.Cell>
            <Table.Cell>
              <a onClick={() => props.openModal(item.id, item.directorNote)}>
                <Icon link name="pencil" />
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
