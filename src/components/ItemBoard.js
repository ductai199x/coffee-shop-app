import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Card } from  '@blueprintjs/core';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

import { numToCurrency } from './Helper.js';

import './css/ItemBoard.css';

class ItemBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: "grid",

        }
    }

    viewItem = (item) => {
        this.props.openItemViewer(item);
    }

    renderItem = (key) => {
        return(
        <Card className={key.id + " cell "} key={key.id} interactive="true" minimal="true" onClick={() => this.viewItem(key) }>
            <LazyLoadImage 
                className="image"
                alt={key.name}
                effect="blur"
                placeholder={<div className="bp3-skeleton"></div>}
                src={key.image}
            />
            <p className="price">{ numToCurrency(key.price[1], "USD") }</p>
            <div className="buy-bar" style={{ display: 'flex', justifyContent: "space-between", alignItems: "baseline", width: "100%" }}>
                <p>{ key.name }</p>
                <Button icon="plus" minimal="true" onClick={() => this.props.addToCart(key)} />
            </div>
        </Card>
        );
    }

    render() {
        return(
        <div className="Item-Board">
            {
                this.props.itemList.map((item, index) => (
                    
                    this.renderItem(item)
                ))
            }
        </div>
        );
    }
}

export default trackWindowScroll(ItemBoard);