import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';

import ItemBoard from './ItemBoard.js';

import './css/Shop.css';

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        console.log(this.props.shopType)
    }

    render() {
        console.log()
        return(
        <div className="Shop">
            <Button onClick={() => this.props.getShopItems() } text="haha" />
            <ItemBoard itemList={ this.props.itemList[this.props.shopType] } />
            <pre>{ JSON.stringify(this.props.itemList[this.props.shopType], null, 4) }</pre>
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

export default connect(mapStateToProps, null)(Shop);