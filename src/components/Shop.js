import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Button } from '@blueprintjs/core';

import { updateItemList, addToCart } from '../actions/actions.js';

import ItemBoard from './ItemBoard.js';

import './css/Shop.css';

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    closeItemViewer = (item) => {
        this.setState({ isViewerOpen: false });
    }

    addToCart = (item) => {
        item['num'] = 1;
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
            <Drawer className="Shop-Drawer"
                isOpen={ this.state.isViewerOpen }
                onClose={() => this.closeItemViewer() }>
                <div>
                    {this.state.viewingItem.name}
                </div>
                <img src={ this.state.viewingItem.image }/>
                <div><p>{ this.state.viewingItem.description }</p></div>
            </Drawer>
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