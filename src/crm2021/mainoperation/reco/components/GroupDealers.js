import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { ROOT_URL } from '../../../utils/constants';
import { doGet } from '../../../../utils/apiActions';

const bukrsBranches = {};
class GroupDealers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: '',
      selectedName: '',
      selectedBukrs: this.props.bukrs,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  loadItems(bukrs) {
    if (!bukrs || bukrs.length == 0) {
      console.log('ERR');
      return;
    }
    doGet(`treference/branches/${bukrs}`)
      .then(res => {
        const loaded = res.data.map(b => ({
          key: b.branch_id,
          text: b.text45,
          value: b.branch_id,
        }));

        this.setState({
          ...this.state,
          options: loaded,
        });
        bukrsBranches[bukrs] = loaded;
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleChange(e, v) {
    this.props.handleChange(e, v);
  }

  componentWillReceiveProps(props) {
    if (props.bukrs && props.bukrs.length > 0) {
      if (bukrsBranches[props.bukrs]) {
        this.setState({
          ...this.state,
          options: bukrsBranches[props.bukrs],
        });
      } else {
        this.loadItems(props.bukrs);
      }
    }
  }

  render() {
    return (
      <Form.Select
        name={this.props.name || 'dealer'}
        multiple={this.props.multiple}
        search={this.props.search}
        selection
        label={this.props.label || 'Дилер'}
        options={this.state.options}
        placeholder={this.props.placeholder || 'Дилер'}
        onChange={this.handleChange}
      />
    );
  }
}

export default GroupDealers;
