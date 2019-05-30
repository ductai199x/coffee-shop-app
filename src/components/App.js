import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home.js';
import Header from './Header.js';
import Shop from './Shop.js';
import Cart from './Cart.js';
import SideMenu from './SideMenu.js';

import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCartOverlay: false,
        }
    }

    toggleCartOverlay = () => {
        this.setState({isCartOverlay: !this.state.isCartOverlay});
    }

    ShopPage = (routeProps) => {
        return ( <Shop {...routeProps} /> );
    }

    render() {
        return (
        <Router>
            <div className="App">
                <Header />
                <div className="Content">
                    <SideMenu toggleCartOverlay={ this.toggleCartOverlay } />
                    <Cart isCartOverlay={ this.state.isCartOverlay }
                        toggleCartOverlay= { this.toggleCartOverlay }/>
                    <Route exact path="/" component={Home} />
                    <Route path="/shop" render={this.ShopPage} />
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
    }
}

export default connect(mapStateToProps, null)(App);