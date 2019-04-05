import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';
import './App.css';
import Signin from './components/Auth/Signin';
import { fetchUnreadMessages } from './actions/inbox';
import {
  fetchTreeMenu,
  fetchAvailableRoutes,
  breadcrumbChanged,
} from './actions/tree_menu';
import Header from './components/Header/Header';
import TreeViewMenu from './components/TreeViewMenu/TreeViewMenu';
import Notification from './general/notification/notification';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
  }

  render() {
    const token = localStorage.getItem('token');
    // If we have a token, consider the user to be signed in
    if (token) {
      return (
        <div className="wrapper">
          <Header
            unread={this.props.unread}
            menuTouched={this.state.menuVisible}
            toggleMenu={() =>
              this.setState({ menuVisible: !this.state.menuVisible })
            }
          />
          <Notification />
          <TreeViewMenu
            visible={this.state.menuVisible}
            lang={this.props.lang}
            list={this.props.treeMenu}
            transactions={this.props.transactions}
            breadcrumbChanged={this.props.breadcrumbChanged}
            toggleMenu={() =>
              this.setState({ menuVisible: !this.state.menuVisible })
            }
          />
          <Dimmer active={this.props.activeLoader}>
            <Loader />
          </Dimmer>
          {this.props.routes}
        </div>
      );
    }
    return <Signin />;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
    unread: state.inbox.unread,
    lang: state.locales.lang,
    treeMenu: state.menu.tree,
    refetch: state.menu.refetch,
    transactions: state.menu.transactions,
    activeLoader: state.loader.active,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchUnreadMessages,
    fetchTreeMenu,
    fetchAvailableRoutes,
    breadcrumbChanged,
  },
)(App);
