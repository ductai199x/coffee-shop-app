import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Button, Label, select } from '@blueprintjs/core';

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
        item['quantity'] = 1;
        this.props.addToCart(item);
    }

    chooseSize = (e) => {
        console.log(e.target.value)
        this.setState({
            ...this.state,
            viewingItem: {
                ...this.state.viewingItem,
                "choice-size": e.target.value
            }
        })
    }

    render() {
        return(
        <div className="Shop">
            <Button onClick={() => this.getShopItems() } text="haha" />
            <ItemBoard 
                addToCart={ this.addToCart }
                itemList={ this.props.itemList[this.props.shopType] } 
                openItemViewer={ this.openItemViewer }/>
            {
                this.state.viewingItem.price !== undefined
                ? <Drawer className="Shop-Drawer"
                    isOpen={ this.state.isViewerOpen }
                    onClose={() => this.closeItemViewer() }>
                    <div>
                        {this.state.viewingItem.name}: 
                        {this.state.viewingItem.price[this.state.viewingItem["item-size"].indexOf(this.state.viewingItem["choice-size"])]}
                    </div>
                    <img src={ this.state.viewingItem.image }/>
                    <div><p>{ this.state.viewingItem.description }</p></div>
                    <label className="bp3-label">
                        Label C
                        <div className="bp3-select">
                        <select onChange={(e) => this.chooseSize(e)}>
                            <option value = "S">Small</option>
                            <option selected="selected" Value = "M">Medium</option>
                            <option value = "L">Large</option>
                        </select>
                        </div>
                    </label>
                </Drawer>
                : null
            }
            
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