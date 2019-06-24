import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Divider, NumericInput, Intent, Alert, Toaster, Button } from  '@blueprintjs/core';

import { numToCurrency } from './Helper.js';
import { updateInCart, removeFromCart } from '../actions/actions.js';

import './css/Cart.css';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAlertDeleteItem: false,
            itemBeingDeleted: {}
        }
    }

    updateInCart = (quantity, item) => {
        if (quantity > 0) {
            item.quantity = quantity;
            this.props.updateInCart(item);
        } else {
            this.setState({isAlertDeleteItem: true, itemBeingDeleted: item});
        }
    }

    removeFromCart = (item) => {
        this.props.removeFromCart(this.state.itemBeingDeleted);
        this.setState({isAlertDeleteItem: false, itemBeingDeleted: {}});
    }

    renderItem = (key) => {
        console.log(key.price[key["item-size"].indexOf(key["choice-size"])])
        return(
            <div className={"Cart-Item column " + key.id} key={key.id}>
                <div className="Item-Image column">
                    <img src={key.image} />
                </div>
                <div className="Item-Info column">
                    <p>{key.name}</p>
                    <p>{key.description}</p>
                    <NumericInput className="Item-Quantity" fill="true"
                        min={0}
                        max={20}
                        value={key.quantity} 
                        onValueChange={(quantity) => this.updateInCart(quantity, key)}/>
                </div>
                <div className="Item-Total column">
                    <p>{numToCurrency(key.price[key["item-size"].indexOf(key["choice-size"])]*key.quantity, "USD")}</p>
                </div>
            </div>
        );
    }

    render() {
        return(
        <Drawer className="Cart-Drawer"
            position="left"
            isOpen={ this.props.isCartOverlay }
            onClose={() => this.props.toggleCartOverlay() }>
            <div className="Cart-Content" vertical="true">
                <p>Your Cart ({this.props.numInCart})</p>
                <p>Total Value {numToCurrency(this.props.totalValue, "USD")}</p>
                <Divider />
                {
                    <div className="Cart-Items">
                        {
                            this.props.itemList.map((item, i) => (
                                this.renderItem(item)
                            ))
                        }
                    </div>
                }
            </div>
            <Alert
                cancelButtonText="Cancel"
                confirmButtonText="Remove"
                icon="trash"
                intent={Intent.DANGER}
                isOpen={this.state.isAlertDeleteItem}
                onCancel={() => this.setState({isAlertDeleteItem: false})}
                onConfirm={() => this.removeFromCart(this.state.itemBeingDeleted)}>
                <p>
                    Are you sure you want to remove this item from your cart?
                </p>
            </Alert>
        </Drawer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        numInCart: state.cart.numInCart,
        itemList: state.cart.itemList,
        totalValue: state.cart.totalValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateInCart, removeFromCart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);