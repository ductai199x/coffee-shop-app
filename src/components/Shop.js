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
    }

    render() {
        return(
        <div className="Shop">
            <Button onClick={() => this.props.getShopItems() } text="haha" />
            
            <ItemBoard itemList={ this.props.itemList } />
            <pre>{ JSON.stringify(this.props.itemList, null, 4) }</pre>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemList: state.shop.itemList,
    }
}

export default connect(mapStateToProps, null)(Shop);