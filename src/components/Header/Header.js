import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Breadcrumb, Dropdown, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import LanguageSwitcher from './LanguageSwitcher';
import TransactionSearchbar from './TransactionSearchbar';
import { fetchUnreadMessages } from "../../actions/inbox";
import { breadcrumbChanged } from "../../actions/tree_menu";
import { calcBreadcrumb } from "../../utils/helpers";

class Header extends Component {
    componentWillMount() {
        if (this.props.authenticated) {
            // TODO replace with valid user id
            const userId = -1;
            this.props.fetchUnreadMessages({userId});
        }
    }

    renderBreadcrumb(translations) {
        const len = translations ? translations.length : 0;
        const lang = this.props.lang;
        const items = [];
        if (len > 0) {
            const breadcrumb = translations.map(t => t[lang]);
            if (len === 1) {
                items.push([<Breadcrumb.Section active key='0'>{breadcrumb[0]}</Breadcrumb.Section>]);
            } else {
                items.push([<Breadcrumb.Section link key='0'>{breadcrumb[0]}</Breadcrumb.Section>]);
            }
            for (let i = 1; i < len; i++) {
                const last = (i === len - 1);
                items.push(<Breadcrumb.Divider icon='right chevron' key={'d' + i}/>);
                if (last) {
                    items.push(<Breadcrumb.Section active key={i}>{breadcrumb[i]}</Breadcrumb.Section>);
                } else {
                    items.push(<Breadcrumb.Section link key={i}>{breadcrumb[i]}</Breadcrumb.Section>);
                }
            }
        }
        // console.log('ITEMS:', items);
        return (
            <Breadcrumb size='small'>
                {items}
            </Breadcrumb>
        )
    };

    handleTransactionSelected(transactionCode) {
        const leafNode = this.props.transactions[transactionCode];
        const breadcrumb = calcBreadcrumb(leafNode);
        this.props.breadcrumbChanged(breadcrumb);
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (<Menu secondary attached="top">
                    <Menu.Item onClick={this.props.toggleMenu} >
                        <Icon name="sidebar" />{formatMessage(messages.menu)}
                    </Menu.Item>

                    <Menu.Item >
                        {/* <Input action={{ type: 'submit', content: 'Go' }} placeholder='Navigate to...' /> */}
                        <TransactionSearchbar transactions={this.props.transactions} transactionSelected={this.handleTransactionSelected.bind(this)}/>
                    </Menu.Item>

                    <Menu.Item>
                        {this.renderBreadcrumb(this.props.breadcrumb)}
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            {formatMessage(messages.inbox)}<Label color='teal' circular>{this.props.unread}</Label>
                        </Menu.Item>

                        <LanguageSwitcher />

                        <Dropdown item text={this.props.username}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to='/settings' icon='setting' text={formatMessage(messages.settings)} />
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to='/signout' icon='log out' text={formatMessage(messages.logout)} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
        )
    }
}

const messages = defineMessages({
    menu: {
        id: 'Header.Menu.MenuLabel', 
        defaultMessage: 'Menu'
    },
    inbox: {
        id: 'Header.Menu.Inbox', 
        defaultMessage: 'Inbox'
    },
    settings: {
      id: 'Header.Menu.Settings', 
      defaultMessage: 'Settings'
    },
    logout: {
        id: 'Header.Menu.Logout',
        defaultMessage: 'Logout'
    }
}); 
  
function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      username: state.auth.username,
      unread: state.inbox.unread,
      breadcrumb: state.menu.breadcrumb,
      lang: state.locales.lang,
      routes: state.menu.routes,
      treeMenu: state.menu.tree,
      transactions: state.menu.transactions
    };
}

Header.propTypes = {
    intl: intlShape.isRequired
};
  
export default connect(mapStateToProps, {fetchUnreadMessages, breadcrumbChanged})(injectIntl(Header));