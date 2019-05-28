import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateItemList } from '../actions/actions.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home.js';
import Header from './Header.js';
import Shop from './Shop.js';
import SideMenu from './SideMenu.js';

import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
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

    ShopPage = (routeProps) => {
        return (
            <Shop 
                {...routeProps}
                getShopItems={ this.getShopItems }
            />
        );
    }

    render() {
        return (
        <Router>
            <div className="App">
                <Header />
                <div className="Content">
                    <SideMenu />
                    <Route exact path="/" component={Home} />
                    <Route path="/shop" render={this.ShopPage} />
                </div>
                <pre>{ JSON.stringify(this.props.itemList, null, 4) }</pre>
            </div>
        </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemList: state.shop.itemList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateItemList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);