import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Divider, NumericInput, Button } from  '@blueprintjs/core';

import './css/Cart.css';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    renderItem = (key) => {
        console.log(key.name)
        return(
            <div className={"Cart-Item column " + key.id} key={key.id}>
                <div className="Item-Image column">
                    <img src={key.image} />
                </div>
                <div className="Item-Info column">
                    <p>{key.name}</p>
                    <p>{key.description}</p>
                    <NumericInput value={key.num}/>
                </div>
                <div className="Item-Price column">
                    <p></p>
                </div>
            </div>
        );
    }

    render() {
        return(
        <Drawer className="Cart-Drawer"
            isOpen={ this.props.isCartOverlay }
            onClose={() => this.props.toggleCartOverlay() }>
            <div className="Cart-Content" vertical="true">
                <p>Your Cart ({this.props.numInCart})</p>
                <Divider  />
                <div className="Cart-Items">
                    {
                        this.props.itemList.map((item, i) => (
                            this.renderItem(item)
                        ))
                    }
                </div>
            </div>
        </Drawer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        numInCart: state.cart.numInCart,
        itemList: state.cart.itemList,
    }
}

export default connect(mapStateToProps, null)(Cart);