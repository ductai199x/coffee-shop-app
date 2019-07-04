import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home.js';
import Header from './Header.js';
import Shop from './Shop.js';
import Cart from './Cart.js';
import SideMenu from './SideMenu.js';
import UserAuth from './UserAuth.js';

import { updateItemList, updateUserDB } from '../actions/actions.js';

import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCartOverlay: false,
            isUserAuthDrawer: false,
        }
    }

    componentDidMount() {
        this.getShopItems();
        this.loadUserDB();
    }

    // API call to DB to get itemList
    getShopItems = () => {
        return new Promise((resolve, reject) => {
            // Get mock data
            let f = require('../mock/itemList.json')
            // let data = JSON.parse(f)
            // console.log(data)
            this.props.updateItemList(f.itemList)
            resolve()
        })
    }

    // Mock User base by loading 
    loadUserDB = () => {
        return new Promise((resolve, reject) => {
            // Get mock data
            let f = require('../mock/users.json')
            // let data = JSON.parse(f)
            // console.log(data)
            this.props.updateUserDB(f.users)
            resolve()
        })
    }

    toggleCartOverlay = () => {
        this.setState({isCartOverlay: !this.state.isCartOverlay});
    }

    toggleUserAuthDrawer = () => {
        this.setState({isUserAuthDrawer: !this.state.isUserAuthDrawer});
    }

    ShopPage = (routeProps) => {
        return ( <Shop {...routeProps} /> );
    }

    render() {
        return (
        <Router>
            <div className="App">
                <Header toggleUserAuthDrawer={ this.toggleUserAuthDrawer } />
                <div className="Content">
                    <SideMenu toggleCartOverlay={ this.toggleCartOverlay } />

                    <Cart isCartOverlay={ this.state.isCartOverlay }
                        toggleCartOverlay= { this.toggleCartOverlay }/>

                    <Route exact path="/" component={Home} />
                    <Route path="/shop" render={this.ShopPage} />

                    <UserAuth 
                        isOpen={ this.state.isUserAuthDrawer }
                        onClose={() => this.toggleUserAuthDrawer() }
                        size="100%"
                        position="top">
                    </UserAuth>
                </div>
                <pre>{ JSON.stringify(this.props.cart, null, 4) }</pre>
            </div>
        </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shop: state.shop,
        cart: state.cart,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateItemList, updateUserDB }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);