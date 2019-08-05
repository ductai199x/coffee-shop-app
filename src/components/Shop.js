import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Drawer, Button, Label, select } from '@blueprintjs/core';

import { updateItemList, addToCart } from '../actions/actions.js';

// import { calculateTotal } from './Helper.js';

import ItemBoard from './ItemBoard.js';
import ItemDetails from './ItemDetails.js';

import './css/Shop.css';

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            price: 0,
            viewingItem: {},
            isViewerOpen: false,
        }
    }

    componentDidMount() {
        this.props.getShopItems();
    }

    openItemViewer = (item) => {
        this.setState({ viewingItem: item, isViewerOpen: true });
    }

    closeItemViewer = () => {
        this.setState({ isViewerOpen: false });
    }

    addToCart = (item) => {
        item['quantity'] = 1;
        this.props.addToCart(item);
    }

    render() {
        return(
        <div className="Shop">
            <ItemBoard 
                addToCart={ this.addToCart }
                itemList={ this.props.itemList[this.props.shopType] } 
                openItemViewer={ this.openItemViewer }/>
            <ItemDetails
                addToCart={ this.addToCart }
                viewingItem={ this.state.viewingItem }
                isViewerOpen={ this.state.isViewerOpen }
                closeItemViewer={ this.closeItemViewer }/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemList: state.shop.itemList,
        shopType: state.shop.type,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateItemList, addToCart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);