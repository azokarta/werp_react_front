import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Grid, Form, Button, Icon } from 'semantic-ui-react';

import {
  fetchTovarId,
  fetchServiceTypeId,
  fetchMatnrPriceSparePart,
  fetchMatnrPriceCartridge,
  fetchMatnrPriceServicePackage,
  fetchServicePackageDetails,
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
  saveSmcsWithoutReques,
  fetchOperatorList,
  fetchMasterList,
} from '../smcsAction';

import {
  f4FetchConTypeList,
  f4FetchCountryList,
  f4FetchCompanyOptions,
  f4fetchCategory,
  f4FetchCustomersById,
} from '../../../../reference/f4/f4_action';

import ModalAddServicePacket from '../modals/ModalAddServicePacket';
import ModalAddSparePart from '../modals/ModalAddSparePart';
import ModalAddCartridge from '../modals/ModalAddCartridge';
import 'react-datepicker/dist/react-datepicker.css';
import Services from './components/Services';
import SaleOfSparePart from './components/SaleOfSparePart';
import SaleCartridge from './components/SaleCartridge';
import ServicePackage from './components/ServicePackage';
import TableReportWithoutRequest from './components/TableReportWithoutRequest';
import BasicInfoWithoutContract from './components/BasicInfoWithoutContract';
import { emptyService } from '../components/directory';

//Создание сервиса без заявки
const TabSmcsWithoutContract = props => {
  const {
    companyOptions = [],
    serviceTypeId = [],
    matnrPriceSparePart = [],
    matnrPriceCartridge = [],
    matnrServicePackage = [],
    servicePacketDetails = [],
    positionSumm = {},
    checkSmcs = {},
    saveSmcs,
    operatorList = [],
    category,
    tovar = [],
    masterList = [],
    branchOptionsService,
  } = props;

  //Основной объект сервиса
  const [service, setService] = useState({ ...emptyService });
  console.log('SERVICE WITHOUT CONTRACT', service);

  const [editStatus, setEditStatus] = useState(true);

  //BasicInfo
  const onBasicInfoInputChange = (value, fieldName) => {
    switch (fieldName) {
      case 'selectCompany':
        setService({ ...service, bukrs: value.value });
        break;
      case 'clearBukrs':
        setService({ ...service, bukrs: '', bukrsName: '' });
        break;
      case 'selectBranch':
        setService({ ...service, branchId: value.value });
        break;
      case 'clearBranch':
        setService({ ...service, branchId: '' });
        break;
      case 'selectCategory':
        setService({ ...service, categoryId: value.value });
        break;
      case 'clearCategory':
        setService({ ...service, categoryId: '' });
        break;
      case 'selectTovar':
        setService({ ...service, tovarId: value.value });
        break;
      case 'clearTovar':
        setService({ ...service, tovarId: '' });
        break;
      case 'selectMaster':
        setService({ ...service, masterId: value.value });
        break;
      case 'clearMaster':
        setService({
          ...service,
          masterFullName: '',
          masterId: 0,
        });
      case 'selectOperator':
        setService({ ...service, operatorId: value.value });
        break;
      case 'clearOperator':
        setService({ ...service, operatorFullName: '', operatorId: 0 });
        break;

      default:
        alert('Нет таких значений');
    }
  };

  const tovarOptions = tovar.map(item => {
    return {
      key: item.matnr,
      text: item.text45,
      value: item.matnr,
    };
  });

  useEffect(() => {
    props.fetchServiceTypeId();
    props.f4fetchCategory();
  }, []);

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const [modalOpen, setModalOpen] = useState({
    matnrF4ModalOpen: false,
    staffF4ModalOpen: false,
  });

  const operatorOptions = operatorList.map(item => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  const masterOptions = masterList.map(item => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  useEffect(() => {
    if (service.bukrs !== '' && service.branchId !== 0) {
      let param = {
        bukrs: service.bukrs,
        branchId: service.branchId,
      };
      props.fetchMasterList({ ...param });
      props.fetchOperatorList({ ...param });
    }
  }, [service.bukrs, service.branchId]);

  useEffect(() => {
    let paramMatnrSparePart = {
      branchId: service.branchId,
      bukrs: service.bukrs,
      masterId: service.masterId,
      serviceTypeId: 3,
      tovarId: service.tovarId,
    };

    let paramMatnrCartridge = {
      branchId: service.branchId,
      bukrs: service.bukrs,
      masterId: service.masterId,
      serviceTypeId: 1,
      tovarId: service.tovarId,
    };
    if (
      service.bukrs &&
      service.branchId &&
      service.masterId &&
      service.tovarId
    ) {
      setEditStatus(false);
      props.fetchMatnrPriceSparePart({ ...paramMatnrSparePart });
      props.fetchMatnrPriceCartridge({ ...paramMatnrCartridge });
    }
  }, [service.masterId, service.branchId, service.bukrs, service.tovarId]);

  useEffect(() => {
    if (service.bukrs && service.categoryId) {
      let param = {
        bukrs: service.bukrs,
        categoryId: service.categoryId,
      };
      props.fetchTovarId({ ...param });
    }
  }, [service.bukrs, service.categoryId]);

  //УСЛУГИ============================================================================================================================
  //==================================================================================================================================

  const [services, setServices] = useState([]);

  const serviceOptions = serviceTypeId
    .filter(
      item =>
        item.id == '2' || item.id == '5' || item.id == '6' || item.id == '7',
    )
    .map(item => {
      return {
        key: parseInt(item.id),
        text: item.name,
        value: parseInt(item.id),
      };
    });

  // Добавить услуги
  const addServices = e => {
    let length = service.positions.length;

    setServices([
      ...services,
      {
        currencyId: null,
        currencyName: null,
        fno: null,
        id: parseInt(`222${length}`),
        matnrId: null,
        matnrName: null,
        matnrPrice: null,
        operationId: null,
        operationName: null,
        quantity: null,
        serviceId: null,
        servicePackageId: null,
        servicePackageName: null,
        serviceTypeId: null,
        serviceTypeName: null,
        sum: null,
        warranty: false,
        ss: 22,
      },
    ]);
  };

  //Select services
  const selectServices = (id, value) => {
    let servicesData = services.filter(item => item.ss == 22);
    let servicesFilter = servicesData.filter(
      item => item.serviceTypeId == value.value,
    );

    console.log(servicesFilter);
    if (servicesFilter.length > 0) {
      alert(
        'Вы не можете добавить несколько одноименных услуг в эту сервис карту',
      );
    } else {
      setServices(
        services.map(item =>
          item.id == id
            ? {
                ...item,
                serviceTypeId: parseInt(value.value),
              }
            : item,
        ),
      );
      let posParam = {
        currencyId: null,
        currencyName: '',
        fno: null,
        id: null,
        matnrId: null,
        matnrName: '',
        matnrPrice: null,
        operationId: null,
        operationName: '',
        quantity: null,
        serviceId: null,
        servicePackageId: null,
        servicePackageName: '',
        serviceTypeId: parseInt(value.value),
        serviceTypeName: '',
        sum: null,
        warranty: false,
      };

      props.fetchPositionSumm(
        service.branchId,
        service.bukrs,
        service.tovarId,
        posParam,
      );
    }
  };

  useEffect(() => {
    if (Object.keys(positionSumm).length > 0) {
      setServices(
        services.map(item =>
          item.serviceTypeId == positionSumm.serviceTypeId
            ? {
                ...item,
                currencyId: positionSumm.currencyId,
                currencyName: positionSumm.currencyName,
                sum: positionSumm.sum,
              }
            : item,
        ),
      );
    }
  }, [positionSumm]);

  //Удалить услуг
  const handleRemoveService = value => {
    let servicesFilter = services.filter(item => item.id !== value.id);
    setServices([...servicesFilter]);
  };

  //ПРОДАЖА ЗАПЧАСТЕЙ========================================================================================
  const [sparePartInitial, setSparePartInitial] = useState([]);

  const [sparePartList, setSparePartList] = useState([]);

  const [modalSparePart, setModalSparePart] = useState(false);

  const onChangeSparePart = (value, fildName, original) => {
    switch (fildName) {
      //Кнопка добавить запчасти
      case 'addSparePartBtn':
        setModalSparePart(true);
        break;

      //Удалить запчасть
      case 'deleteSparePart':
        let deleteFilter = sparePartInitial.filter(
          item => item.id !== value.id,
        );
        setSparePartInitial([...deleteFilter]);

        setSparePartList(
          sparePartList.map(item =>
            item.id === value.id
              ? {
                  ...item,
                  checked: false,
                }
              : item,
          ),
        );
        break;

      //Количество запчастей
      case 'quantitySparePart':
        let val = value.target.value;
        if (val <= original.menge) {
          setSparePartInitial(
            sparePartInitial.map(item =>
              item.id === original.id
                ? {
                    ...item,
                    quantity: val,
                    sum: val * item.matnrPrice,
                  }
                : item,
            ),
          );
        } else {
          alert(`У Вас в подотчете ${original.menge}`);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    matnrPriceSparePart.map((item, index) => {
      setSparePartList(prev => [
        ...prev,
        {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: item.fno,
          id: item.matnrId + index,
          matnrId: item.matnrId,
          matnrName: item.matnrName,
          matnrPrice: item.price,
          operationId: null,
          operationName: null,
          menge: item.menge,
          quantity: 1,
          serviceId: null,
          servicePackageId: null,
          servicePackageName: null,
          serviceTypeId: 3,
          serviceTypeName: null,
          sum: null,
          warranty: null,
          checked: false,
        },
      ]);
    });
  }, [matnrPriceSparePart]);

  //Выбрать запчасть
  const checkedSparePart = value => {
    if (value.checked === true) {
      setSparePartList(
        sparePartList.map(item =>
          item.id === value.id
            ? {
                ...item,
                checked: false,
                quantity: item.quantity,
                sum: item.sum,
              }
            : item,
        ),
      );
    } else {
      setSparePartList(
        sparePartList.map(item =>
          item.id === value.id
            ? {
                ...item,
                checked: true,
                quantity: item.quantity,
                sum: item.matnrPrice * item.quantity,
              }
            : item,
        ),
      );
    }
  };

  // Применить выбранные запчасти
  const handleApplySparePart = () => {
    setModalSparePart(false);
  };

  useEffect(() => {
    let filterSparePart = sparePartList.filter(item => item.checked === true);
    setSparePartInitial([...filterSparePart]);
  }, [sparePartList]);

  //ПРОДАЖА КАРТРИДЖЕЙ==================================================================================
  const [cartridgeInitial, setCartridgeInitial] = useState([]);
  const [cartridgeList, setCartridgeList] = useState([]);
  const [modalCartridge, setModalCartridge] = useState(false);

  const onChangeCartridge = (value, fieldName, original) => {
    switch (fieldName) {
      //Добавить картридж в список
      case 'checkedCartridge':
        if (value.checked === true) {
          setCartridgeList(
            cartridgeList.map(item =>
              item.id === value.id
                ? {
                    ...item,
                    checked: false,
                    quantity: item.quantity,
                    sum: item.sum,
                  }
                : item,
            ),
          );
        } else {
          setCartridgeList(
            cartridgeList.map(item =>
              item.id === value.id
                ? {
                    ...item,
                    checked: true,
                    quantity: item.quantity,
                    sum: item.matnrPrice * item.quantity,
                  }
                : item,
            ),
          );
        }
        break;
      // Закрыть модальное окно
      case 'closeModalCartridge':
        setModalCartridge(false);
        break;
      //Кнопка добавить картридж
      case 'addCartridgeBtn':
        setModalCartridge(true);
        break;
      //F№ изменение
      case 'fnoEdit':
        setCartridgeList(
          cartridgeList.map(item =>
            item.id === original.id
              ? {
                  ...item,
                  fno: parseInt(value.value, 10),
                }
              : item,
          ),
        );
        break;
      //Удалить картридж
      case 'deleteCartridge':
        let deleteFilter = cartridgeInitial.filter(
          item => item.id !== value.id,
        );
        setCartridgeList([...deleteFilter]);

        setCartridgeList(
          cartridgeList.map(item =>
            item.id === value.id
              ? {
                  ...item,
                  checked: false,
                }
              : item,
          ),
        );
        break;

      //Количество картриджей
      case 'quantityCartridge':
        let val = value.target.value;
        if (val <= original.menge) {
          setCartridgeList(
            cartridgeList.map(item =>
              item.id === original.id
                ? {
                    ...item,
                    quantity: val,
                    sum: val * item.matnrPrice,
                  }
                : item,
            ),
          );
        } else {
          alert(`У Вас в подотчете ${original.menge}`);
        }
        break;

      default:
        alert('Нет таких значений');
    }
  };

  useEffect(() => {
    matnrPriceCartridge.map((item, index) => {
      setCartridgeList(prev => [
        ...prev,
        {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: null,
          id: item.matnrId + index,
          matnrId: item.matnrId,
          matnrName: item.matnrName,
          matnrPrice: item.price,
          operationId: null,
          operationName: null,
          menge: item.menge,
          quantity: 1,
          serviceId: null,
          servicePackageId: null,
          servicePackageName: null,
          serviceTypeId: 1,
          serviceTypeName: null,
          sum: null,
          warranty: null,
          checked: false,
        },
      ]);
    });
  }, [matnrPriceCartridge]);

  useEffect(() => {
    let filterCartridge = cartridgeList.filter(item => item.checked === true);
    setCartridgeInitial([...filterCartridge]);
  }, [cartridgeList]);

  //СЕРВИС ПАКЕТ========================================================================================

  const [servicePackageInitial, setServicePackageInitial] = useState([]);
  const [servicePackageList, setServicePackageList] = useState([]);
  const [modalServicePackage, setModalServicePackage] = useState(false);

  const onChangeServicePackage = (value, fieldName, original) => {
    switch (fieldName) {
      case 'checkedServicePackage':
        if (value.checked === true) {
          setServicePackageList(
            servicePackageList.map(item =>
              item.id === value.id
                ? {
                    ...item,
                    checked: false,
                  }
                : item,
            ),
          );
        } else {
          setServicePackageList(
            servicePackageList.map(item =>
              item.id === value.id
                ? {
                    ...item,
                    checked: true,
                  }
                : item,
            ),
          );
          let paramServicePackageDetails = {
            branchId: service.branchId,
            bukrs: service.bukrs,
            servicePackageId: value.id,
          };

          props.fetchServicePackageDetails({ ...paramServicePackageDetails });
        }
        break;
      case 'modalOpenServicePackage':
        setModalServicePackage(true);
        break;
      case 'closeOpenServicePackage':
        setModalServicePackage(false);
        break;

      case 'deleteServicePackage':
        let deleteFilterSP = servicePackageInitial.filter(
          item => item.id !== value.id,
        );
        setServicePackageInitial([...deleteFilterSP]);
        setServicePackageList(
          servicePackageList.map(item =>
            item.id === value.id
              ? {
                  ...item,
                  checked: false,
                }
              : item,
          ),
        );
        break;

      case 'dimmerClose':
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    matnrServicePackage.map((item, index) => {
      setServicePackageList(prev => [
        ...prev,
        {
          index: null,
          currencyId: item.currencyId,
          currencyName: item.waers,
          fno: null,
          id: item.id,
          matnrId: item.matnrId,
          matnrName: item.name,
          matnrCode: null,
          matnrPrice: null,
          menge: null,
          qinit: null,
          qminus: null,
          operationId: null,
          quantity: 1,
          serviceId: null,
          servicePackageId: item.id,
          serviceTypeId: 4,
          sum: item.summ,
          warranty: null,
          checked: false,
          details: [],
        },
      ]);
    });
  }, [matnrServicePackage]);

  useEffect(() => {
    if (servicePacketDetails.length > 0) {
      let detailsId = servicePacketDetails[0].servicePackageId;
      setServicePackageList(
        servicePackageList.map(item =>
          item.id === detailsId
            ? {
                ...item,
                details: [...servicePacketDetails],
              }
            : item,
        ),
      );
    }
  }, [servicePacketDetails]);

  useEffect(() => {
    let filterServicePackage = servicePackageList.filter(
      item => item.checked === true,
    );
    setServicePackageInitial([...filterServicePackage]);
  }, [servicePackageList]);

  useEffect(() => {
    let servicesF = services.map(item => {
      return {
        currencyId: item.currencyId,
        currencyName: item.currencyName,
        fno: item.fno,
        id: null,
        matnrId: item.matnrId,
        matnrName: item.matnrName,
        matnrPrice: item.matnrPrice,
        operationId: item.operationId,
        operationName: item.operationName,
        quantity: item.quantity,
        serviceId: item.serviceId,
        servicePackageId: item.servicePackageId,
        servicePackageName: item.servicePackageName,
        serviceTypeId: item.serviceTypeId,
        serviceTypeName: item.serviceTypeName,
        sum: item.sum,
        warranty: item.warranty,
      };
    });

    let sparePart = sparePartInitial
      .filter(item => item.checked === true)
      .map(item => {
        return {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: item.fno,
          id: null,
          matnrId: item.matnrId,
          matnrName: item.matnrName,
          matnrPrice: item.matnrPrice,
          operationId: item.operationId,
          operationName: item.operationName,
          quantity: item.quantity,
          serviceId: item.serviceId,
          servicePackageId: item.servicePackageId,
          servicePackageName: item.servicePackageName,
          serviceTypeId: item.serviceTypeId,
          serviceTypeName: item.serviceTypeName,
          sum: item.sum,
          warranty: item.warranty,
        };
      });

    let cartridge = cartridgeInitial
      .filter(item => item.checked === true)
      .map(item => {
        return {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: item.fno,
          id: null,
          matnrId: item.matnrId,
          matnrName: item.matnrName,
          matnrPrice: item.matnrPrice,
          operationId: item.operationId,
          operationName: item.operationName,
          quantity: item.quantity,
          serviceId: item.serviceId,
          servicePackageId: item.servicePackageId,
          servicePackageName: item.servicePackageName,
          serviceTypeId: item.serviceTypeId,
          serviceTypeName: item.serviceTypeName,
          sum: item.sum,
          warranty: item.warranty,
        };
      });

    let servicePackage = [];

    servicePackageInitial
      .filter(item => item.checked === true)
      .map(elem =>
        elem.details.map(item => {
          return servicePackage.push({
            currencyId: item.currencyId,
            currencyName: item.currencyName,
            fno: item.fno,
            id: null,
            matnrId: item.matnrId,
            matnrName: item.matnrName,
            matnrPrice: item.matnrPrice,
            operationId: item.operationId,
            operationName: item.operationName,
            quantity: item.quantity,
            serviceId: item.serviceId,
            servicePackageId: item.servicePackageId,
            servicePackageName: item.servicePackageName,
            serviceTypeId: item.serviceTypeId,
            serviceTypeName: item.serviceTypeName,
            sum: item.sum,
            warranty: item.warranty,
          });
        }),
      );

    setService({
      ...service,
      positions: [...servicesF, ...sparePart, ...cartridge, ...servicePackage],
    });
  }, [, services, sparePartInitial, cartridgeInitial, servicePackageInitial]);

  const handleCheck = () => {
    if (service.operatorId) {
      alert('Выберите оператора');
    } else {
      alert('CHECK');
      props.checkSmcsWithoutReques(service);
    }
  };

  const handleSave = () => {
    props.saveSmcsWithoutReques(service);
  };

  useEffect(() => {
    if (checkSmcs.contractId === service.contractId) {
      setService({
        ...service,
        sumTotal: checkSmcs.sumTotal,
        discount: checkSmcs.discount,
        sumForPay: checkSmcs.sumForPay,
        paid: checkSmcs.paid,
        masterPremium: checkSmcs.masterPremium,
        operatorPremium: checkSmcs.operatorPremium,
      });
    }
  }, [checkSmcs]);
  return (
    <Form>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfoWithoutContract
              data={service}
              operatorOptions={operatorOptions}
              onBasicInfoInputChange={onBasicInfoInputChange}
              companyOptions={companyOptions}
              branchOptions={branchOptionsService[service.bukrs]}
              categoryOptions={categoryOptions}
              tovarOptions={tovarOptions}
              masterOptions={masterOptions}
            />
          </Grid.Column>

          <Grid.Column readOnly width={11}>
            {/*Услуги */}
            <Services
              data={services}
              addServices={addServices}
              servicesOptions={serviceOptions}
              handleRemoveService={handleRemoveService}
              selectServices={selectServices}
              waers={service.currencyName}
              editStatus={editStatus}
              currency={service.currencyName}
            />

            {/*Продажа запчастей */}
            <SaleOfSparePart
              data={sparePartInitial}
              onChangeSparePart={onChangeSparePart}
              editStatus={editStatus}
            />

            <ModalAddSparePart
              data={sparePartList}
              modalOpen={modalSparePart}
              checkedSparePart={checkedSparePart}
              handleApplySparePart={handleApplySparePart}
            />

            {/*Продажа картриджей */}
            <SaleCartridge
              data={cartridgeInitial}
              onChangeCartridge={onChangeCartridge}
              editStatus={editStatus}
            />

            <ModalAddCartridge
              data={cartridgeList}
              modalOpen={modalCartridge}
              onChangeCartridge={onChangeCartridge}
            />

            {/*Сервис пакет*/}
            <ServicePackage
              data={servicePackageInitial}
              onChangeServicePackage={onChangeServicePackage}
              editStatus={editStatus}
            />
            <ModalAddServicePacket
              data={servicePackageList}
              modalStatus={modalServicePackage}
              onChangeServicePackage={onChangeServicePackage}
            />

            {/*Таблица*/}
            <TableReportWithoutRequest
              data={service}
              currency={service.currencyName}
            />

            {/*Проверить*/}
            <Button color="green" onClick={handleCheck}>
              <Icon name="check" size="large" />
              Проверить
            </Button>

            {/*Сохранить*/}
            <Button type="submit" primary onClick={handleSave}>
              <Icon name="save" size="large" />
              Сохранить
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    contractTypeList: state.f4.contractTypeList,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    category: state.f4.category,
    customersById: state.f4.customersById,
    tovar: state.smcsReducer.tovar,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    matnrPriceSparePart: state.smcsReducer.matnrPriceSparePart,
    matnrPriceCartridge: state.smcsReducer.matnrPriceCartridge,
    matnrServicePackage: state.smcsReducer.matnrServicePackage,
    servicePacketDetails: state.smcsReducer.servicePacketDetails,
    positionSumm: state.smcsReducer.smcsFetchPositionSumm,
    checkSmcs: state.smcsReducer.checkSmcs,
    saveSmcs: state.smcsReducer.saveSmcs,
    operatorList: state.smcsReducer.operatorList,
    masterList: state.smcsReducer.masterList,
  };
}

export default connect(mapStateToProps, {
  f4FetchConTypeList,
  f4FetchCountryList,
  f4FetchCompanyOptions,
  f4fetchCategory,
  f4FetchCustomersById,
  fetchTovarId,
  fetchServiceTypeId,
  fetchMatnrPriceSparePart,
  fetchMatnrPriceCartridge,
  fetchMatnrPriceServicePackage,
  fetchServicePackageDetails,
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
  saveSmcsWithoutReques,
  fetchOperatorList,
  fetchMasterList,
})(injectIntl(TabSmcsWithoutContract));
