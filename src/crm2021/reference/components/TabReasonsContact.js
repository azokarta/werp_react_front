import React, { useEffect, useState } from 'react';
import ModalCreate from './ModalCreate';
import {
  Button,
  Divider,
  Input,
  Table,
  Popup,
  Dropdown,
} from 'semantic-ui-react';

//
const TabReasonsContact = props => {
  const {
    crudData,
    create,
    update,
    get,
    data = [],
    deleteReasonContract,
    optionsData = [],
    getCategory,
  } = props;
  const { headerText } = crudData;
  const initialTempData = {
    name: '',
    nameEn: '',
    nameTr: '',
    category: null,
  };
  const [tempData, setTempData] = useState(initialTempData);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setDataList(
        data.map(el => {
          return { ...el, editStatus: false };
        }),
      );
    } else {
      setDataList([]);
    }
  }, [data]);

  const createFormData = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        setTempData({ ...tempData, name: value });
        break;
      case 'nameEn':
        setTempData({ ...tempData, nameEn: value });
        break;
      case 'nameTr':
        setTempData({ ...tempData, nameTr: value });
        break;
      case 'category':
        console.log(fieldName, value);
        setTempData({ ...tempData, category: value });
        break;
    }
  };

  const updateFormData = (fieldName, value, id) => {
    switch (fieldName) {
      case 'name':
        setDataList(
          dataList.map(el =>
            el.id === id
              ? {
                  ...el,
                  name: value,
                }
              : el,
          ),
        );

        break;
      case 'nameEn':
        setDataList(
          dataList.map(el =>
            el.id === id
              ? {
                  ...el,
                  nameEn: value,
                }
              : el,
          ),
        );

        break;
      case 'nameTr':
        setDataList(
          dataList.map(el =>
            el.id === id
              ? {
                  ...el,
                  nameTr: value,
                }
              : el,
          ),
        );

        break;
      case 'category':
        setDataList(
          dataList.map(el =>
            el.id === id
              ? {
                  ...el,
                  category: value,
                }
              : el,
          ),
        );

        break;
    }
  };

  const saveCrudModal = () => {
    create(tempData, () => {
      get();
      setModalOpen(false);
    });
  };

  const editRow = data => {
    setDataList(
      dataList.map(el =>
        el.id === data.id
          ? {
              ...el,
              editStatus: el.editStatus === false,
            }
          : el,
      ),
    );
  };
  const saveEditRow = id => {
    let filterData = dataList
      .filter(item => item.id === id)
      .map(el => {
        return {
          id: el.id,
          name: el.name,
          nameEn: el.nameEn,
          nameTr: el.nameTr,
          category: el.category,
        };
      });
    update(filterData[0], () => {
      get();
    });
  };
  const options = optionsData.map((item, index) => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });
  return (
    <div>
      <ModalCreate
        open={modalOpen}
        closeCrudModal={() => setModalOpen(false)}
        crudData={crudData}
        saveCrudModal={saveCrudModal}
        createFormData={createFormData}
        trans="ReasonsContact"
        options={options}
        getCategory={getCategory}
      />
      <div className="tab-header">
        <h5>{headerText}</h5>
        <Button color="green" onClick={() => setModalOpen(true)}>
          Добавить
        </Button>
      </div>

      <Divider />
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
            <Table.HeaderCell>Наименование</Table.HeaderCell>
            <Table.HeaderCell>English</Table.HeaderCell>
            <Table.HeaderCell>Türk</Table.HeaderCell>
            <Table.HeaderCell>Категория</Table.HeaderCell>
            <Table.HeaderCell>Редактирование</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataList.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell width={1}>{item.id}</Table.Cell>
              <Table.Cell width={3}>
                <Input
                  readOnly={item.editStatus === false}
                  value={item.name}
                  onChange={(e, { value }) =>
                    updateFormData('name', value, item.id)
                  }
                />
              </Table.Cell>
              <Table.Cell width={3}>
                <Input
                  readOnly={item.editStatus === false}
                  value={item.nameEn}
                  onChange={(e, { value }) =>
                    updateFormData('nameEn', value, item.id)
                  }
                />
              </Table.Cell>
              <Table.Cell width={3}>
                <Input
                  readOnly={item.editStatus === false}
                  value={item.nameTr}
                  onChange={(e, { value }) =>
                    updateFormData('nameTr', value, item.id)
                  }
                />
              </Table.Cell>
              <Table.Cell width={3}>
                {item.editStatus === false ? (
                  <Input
                    readOnly={item.editStatus === false}
                    value={item.category}
                    onChange={(e, { value }) =>
                      updateFormData('nameTr', value, item.id)
                    }
                  />
                ) : (
                  <Dropdown
                    selection
                    options={options}
                    onChange={(e, { value }) =>
                      updateFormData('category', value, item.id)
                    }
                  />
                )}
              </Table.Cell>

              <Table.Cell width={2}>
                {item.editStatus === true ? (
                  <Popup
                    content="Сохранить"
                    trigger={
                      <Button
                        circular
                        color="blue"
                        onClick={() => saveEditRow(item.id)}
                        icon="save"
                      />
                    }
                  />
                ) : (
                  <Popup
                    content="Редактировать"
                    trigger={
                      <Button
                        circular
                        color="yellow"
                        onClick={() => editRow(item)}
                        icon="pencil"
                      />
                    }
                  />
                )}
                <Popup
                  content="Удалить"
                  trigger={
                    <Button
                      circular
                      color="red"
                      onClick={() => deleteReasonContract(item.id, () => get())}
                      icon="delete"
                    />
                  }
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
export default TabReasonsContact;
