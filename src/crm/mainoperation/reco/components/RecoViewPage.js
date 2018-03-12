import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Header,Container,Button,Segment,Grid,Divider,Modal } from 'semantic-ui-react'
import RecoUpdateModal from './RecoUpdateModal';
import {fetchSingleReco,toggleRecoUpdateModal,fetchCallResults,deleteReco} from '../actions/recoAction'
import {fetchReasons} from '../../demo/actions/demoAction'
import { connect } from 'react-redux'
import ChildDemosTable from '../../demo/components/ChildDemosTable'
import ChildCallsTable from '../../call/components/ChildCallsTable'
import RecoViewTable from './RecoViewTable'

class RecoViewPage extends Component {
  constructor (props) {
    super(props)
    this.loadedSuccess = true
    this.state = {
      calls: [],
      demos: [],
      callResultOptions: [],
      callRefuseOptions: [],
      items: [],
      loading: false,
      updateModalOpened: false,
      showDeleteModal: false,
      showPhoneUpdateModal: false
    }

    this.renderActions = this.renderActions.bind(this)
    this.deleteModalTrigger = this.deleteModalTrigger.bind(this)
  }

    componentWillMount(){
        const id = parseInt(this.props.match.params.id, 10)

        this.props.fetchSingleReco(id)
        this.props.fetchCallResults()
        this.props.fetchReasons()
  }

  deleteModalTrigger (showDeleteModal) {
    this.setState({
      ...this.state,
      showDeleteModal: showDeleteModal
    })
  }

    renderDeleteConfirmModal(){
        return <Modal open={this.state.showDeleteModal}>
            <Modal.Header>ПРЕДУПРЕЖДЕНИЕ!</Modal.Header>
            <Modal.Content>
                <p>Удалятся все демонстрации, рекомендации и звонки связанные с данной рекомендацией!</p>
                <p>Удалятся: Демо, Звонки, Тел. номера связанные с данной рекомендацией!</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => this.deleteModalTrigger(false)} negative>
                    Отмена
        </Button>
        <Button onClick={() => this.props.deleteReco(this.props.reco.id)} positive icon='checkmark' labelPosition='right' content='Удалить' />
      </Modal.Actions>
    </Modal>
  }

    renderActions(){
        return <div>
            <Link className={'ui icon button'} to={`/crm/reco/current`}>
                В список текущих
            </Link>

            <Link className={'ui icon button'} to={`/crm/reco/archive`}>
                В Архив
            </Link>

            <Button onClick={() => this.props.toggleRecoUpdateModal(true)}>Редактировать</Button>
            <Button color={'red'} onClick={() => this.deleteModalTrigger(true)}>Удалить</Button>
    </div>
  }

  render () {
        const {reco} = this.props
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
          <Header as='h2' floated='left'>Рекомендация № {this.props.reco.id}</Header>
        </Segment>
        {this.renderActions()}
        <RecoUpdateModal />
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
                <RecoViewTable reco={reco}/>
            </Grid.Column>

            <Grid.Column width={10}>
                <ChildCallsTable items={reco.calls || []} />
                <ChildDemosTable items={reco.demos || []}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.renderDeleteConfirmModal()}
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        reco:state.crmReco.reco,
        loader:state.loader
    }
}

export default connect(mapStateToProps, {fetchSingleReco,toggleRecoUpdateModal,fetchCallResults,fetchReasons,deleteReco})(RecoViewPage)
