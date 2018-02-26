import React, {Component} from 'react'
import {Modal, Form, Input, TextArea, Button} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import {ROOT_URL} from '../../../../utils/constants'

const locationOptions = [
  {
    key: 1,
    text: 'Город',
    value: 1
  },
  {
    key: 2,
    text: 'ЗАгород',
    value: 2
  }
]

const RESULT_DONE = 1
const RESULT_MOVED = 2
const RESULT_CANCELLED = 3

let allReasons = []

class DemoCreateModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      opened: false,
      demo: {
        parentId: props.parentId,
        recoId: props.recoId,
        visitId: props.visitId,
        callId: 0,
        clientName: '',
        contractNumber: 0,
        dateTime: null,
        dealerId: props.dealerId,
        locationId: 0,
        resultId: 0,
        reasonId: 0,
        saleDate: null
      },
      loaded: false,
      results: [],
      dealers: [],
      reasons: [],
      errors: {
        dealerId: false,
        resultId: false,
        reasonId: false,
        dateTime: false,
        clientName: false,
        address: false,
        locationId: false
      }
    }

    this.close = this.close.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.renderUpdateForm = this.renderUpdateForm.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.saveDemo = this.saveDemo.bind(this)
  }

  loadReasons () {
    axios.get(`${ROOT_URL}/api/reference/reasons/0`, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      allReasons = res.data
    }).catch((e) => {
      console.log(e)
    })
  }

  componentWillMount () {
    axios.get(`${ROOT_URL}/api/crm/demo/results`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then((res) => {
      let results = Object.keys(res.data).map((k) => {
        return {
          key: k,
          text: res.data[k],
          value: k
        }
      })
      this.setState({
        ...this.state,
        results: results
      })
    }).catch((e) => {
      console.log(e)
    })

    axios.get(`${ROOT_URL}/api/hr/pyramid/crm/group-dealers`, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      let loaded = res.data.map((item) => {
        return {
          key: item.staffId,
          text: item.lastname + ' ' + item.firstname,
          value: item.staffId
        }
      })
      loaded.unshift({
        key: 0,
        text: 'Не выбрано',
        value: 0
      })
      this.setState({
        ...this.state,
        dealers: loaded
      })
    }).catch((e) => {
      console.log(e)
    })

    this.loadReasons()
  }

  handleDate (p1, p2, p3) {
    console.log(p1, p2, p3)
  }

  getReasonsByResultId (resultId) {
    let reasonTypeId = 0
    resultId = parseInt(resultId,10);
    if (resultId === RESULT_DONE) {
      reasonTypeId = 2
    } else if (resultId === RESULT_CANCELLED) {
      reasonTypeId = 3
    } else if (resultId === RESULT_MOVED) {
      reasonTypeId = 4
    }

    let out = []
    for (let k in allReasons) {
      if (allReasons[k]['typeId'] === reasonTypeId) {
        out.push({
          key: allReasons[k]['id'],
          text: allReasons[k]['name'],
          value: allReasons[k]['id']
        })
      }
    }

    return out
  }

  renderReasonRow () {
    let resultId = this.state.demo.resultId
    if (resultId === RESULT_CANCELLED || resultId === RESULT_DONE || resultId === RESULT_MOVED) {
      return <Form.Select error={this.state.errors.reasonId}
        value={this.state.demo.reasonId}
        required fluid selection
        label='Причина' options={this.getReasonsByResultId(resultId)}
        onChange={(e, v) => this.handleChange('reasonId', v)} />
    }

    return <Form.Field />
  }

  renderUpdateForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Field error={this.state.errors.clientName} onChange={(e, o) => this.handleChange('clientName', o)}
          value={this.state.demo.clientName}
          control={Input} required label='ФИО клиента' placeholder='ФИО клиента' />
        <Form.Field error={this.state.errors.dateTime} required>
          <label>Дата-время демонстрации</label>
          <DatePicker
            label=''
            placeholderText={'Дата-время демонстрации'}
            showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
            dateFormat='DD.MM.YYYY HH:mm' selected={this.state.demo.dateTime ? moment(this.state.demo.dateTime) : null}
            onChange={(v) => this.handleChange('dateTime', v)} />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.resultId}
          value={this.state.demo.resultId}
          required fluid selection
          label='Результат' options={this.state.results}
          onChange={(e, v) => this.handleChange('resultId', v)} />
        {this.renderReasonRow()}
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field error={this.state.errors.address}
          required control={TextArea}
          onChange={(e, o) => this.handleChange('address', o)}
          label='Адрес' placeholder='Адрес'
          value={this.state.demo.address}
        />
        <Form.Select error={this.state.errors.locationId}
          value={this.state.demo.locationId}
          required fluid selection
          label='Местоположение' options={locationOptions}
          onChange={(e, v) => this.handleChange('locationId', v)} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select error={this.state.errors.dealerId}
          value={this.state.demo.dealerId}
          required fluid selection
          label='Дилер' options={this.state.dealers}
          onChange={(e, v) => this.handleChange('dealerId', v)} />

        <Form.Field control={TextArea}
          onChange={(e, o) => this.handleChange('note', o)}
          label='Примечание для демо'
          placeholder='Примечание для демо'
          value={this.state.demo.note || ''}
        />
      </Form.Group>
    </Form>
  }

  handleChange (fieldName, o) {
    let {demo} = this.state

    switch (fieldName) {
      case 'dateTime':
        if (o) {
          demo[fieldName] = o.valueOf()
        } else {
          demo[fieldName] = null
        }

        break
      case 'locationId':
      case 'clientName':
      case 'address':
      case 'resultId':
      case 'reasonId':
      case 'dealerId':
      case 'note':
        demo[fieldName] = o.value
        if (fieldName === 'resultId') {
          demo['reasonId'] = 0
        }
        break
        default:{}
    }

    this.setState({
      ...this.state,
      demo: demo
    })
  }

  validateForm () {
    let {demo, errors} = this.state
      for(let k in errors){
          if (errors.hasOwnProperty(k)) {
              errors[k] = false
          }
      }

    if (demo.resultId === RESULT_MOVED || demo.resultId === RESULT_CANCELLED || demo.resultId === RESULT_DONE) {
      if (demo.reasonId === 0) {
        errors['reasonId'] = true
      }
    }

    if (!demo.dealerId || demo.dealerId === 0) {
      errors['dealerId'] = true
    }

    if (!demo.clientName || demo.clientName.length === 0) {
      errors['clientName'] = true
    }

    if (!demo.dateTime || demo.dateTime.length === 0) {
      errors['dateTime'] = true
    }

    if (!demo.address || demo.address.length === 0) {
      errors['address'] = true
    }

    this.setState({
      ...this.state,
      errors: errors
    })
  }

  componentWillReceiveProps (props) {
    let {parentId, recoId, visitId, dealerId} = props
    let {demo} = this.state
    demo['parentId'] = parentId
    demo['visitId'] = visitId
    demo['recoId'] = recoId
    demo['dealerId'] = dealerId
    this.setState({
      ...this.state,
      demo: demo
    })
  }

  saveDemo () {
    console.log(this.state.demo)
    this.validateForm()
    let isValid = true
      for(let k in this.state.errors){
          if (this.state.errors[k]) {
              isValid = false
              break
          }
      }

    if (!isValid) {
      return
    }
    axios.post(`${ROOT_URL}/api/crm/demo`, { ...this.state.demo }, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then((response) => {
        this.close()
      }).catch((error) => {
        console.log(error)
      })
  }

  close () {
    this.props.onClose(false)
  }

  onOpen (e, data) {
    console.log('OPENED')
  }

  render () {
    const {modalOpened} = this.props
    return (
      <Modal size={'small'} open={modalOpened} onOpen={this.onOpen}>
        <Modal.Header>Редактирование демонстрации</Modal.Header>
        <Modal.Content>
          {this.renderUpdateForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.close}>Отмена</Button>
          <Button positive icon='checkmark' onClick={this.saveDemo} labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default DemoCreateModal
