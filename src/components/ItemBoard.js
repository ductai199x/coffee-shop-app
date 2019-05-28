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
            isPlaceHolder: {}
        }
    }

    componentWillMount() {
        this.props.itemList.map((item, index) => (
            this.togglePlaceHolder(item.id, "inline-block")
        ));
    }

    viewItem = (item) => {
        this.props.openItemViewer(item);
    }

    togglePlaceHolder = (id, state) => {
        this.setState({ isPlaceHolder: {
            ...this.state.isPlaceHolder,
            [id]: state
        }})
    }

    renderItem = (key) => {
        
        return(
        <Card className={key.id + " cell "} key={key.id} interactive="true" minimal="true" onClick={() => this.viewItem(key) }>
            <LazyLoadImage 
                afterLoad={() => this.togglePlaceHolder(key.id, "none")}
                className="item-image"
                alt={key.name}
                effect="blur"
                src={key.image}
                threshold={100}
                wrapperClassName="Item-Lazy-Image"
            />
            <div className="Item-Image-Placeholder bp3-skeleton" style={{display: this.state.isPlaceHolder[key.id]}}></div>
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