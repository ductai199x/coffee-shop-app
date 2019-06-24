import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Button, Label, select } from '@blueprintjs/core';

import { updateItemList, addToCart } from '../actions/actions.js';

import { calculateTotal } from './Helper.js';

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

    openItemViewer = (item) => {
        this.setState({ viewingItem: item, isViewerOpen: true });
    }

    closeItemViewer = () => {
        console.log(this.state.viewingItem);
        this.setState({ isViewerOpen: false });
    }

    addToCart = (item) => {
        item['quantity'] = 1;
        this.props.addToCart(item);
    }

    render() {
        return(
        <div className="Shop">
            <Button onClick={() => this.getShopItems() } text="haha" />
            <ItemBoard 
                addToCart={ this.addToCart }
                itemList={ this.props.itemList[this.props.shopType] } 
                openItemViewer={ this.openItemViewer }/>
            <ItemDetails
                viewingItem = { this.state.viewingItem }
                isViewerOpen = { this.state.isViewerOpen }
                closeItemViewer = { this.closeItemViewer }/>
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