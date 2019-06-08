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

    render() {
        return(
        <div className="Shop">
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