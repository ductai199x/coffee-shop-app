import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Popover, 
         Menu,
         MenuItem, 
         Card, 
         Button, 
         Icon } from  '@blueprintjs/core';
import { updateShopType } from '../actions/actions.js';

import './css/SideMenu.css';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    toggleCartOverlay = () => {
        this.props.toggleCartOverlay();
    }

    renderShopTypeTarget = () => {
        return(
            <Button className="Shop-Layout-Button" minimal={true}>
                <Icon icon="shop" iconSize={26} />
            </Button>
        );
    }

    renderShopTypeMenu = () => {
        return(
            <Menu>
                <MenuItem text="coffee" onClick={() => this.props.updateShopType("coffee")} />
                <MenuItem text="brand items" onClick={() => this.props.updateShopType("brand-items")}/>
            </Menu>
        );
    }

    render() {
        return(
        <Card className="Side-Menu" >
            <Button className="Menu-Button" minimal={true}>
                <Icon icon="menu" iconSize={26} />
            </Button>
            <Popover className="Shop-Type-PopOver" position="right" 
                target={ this.renderShopTypeTarget() } 
                content={ this.renderShopTypeMenu() }
            />
            <Button className="Cart-Button" minimal={true}
                onClick={() => this.toggleCartOverlay() }>
                <Icon icon="shopping-cart" iconSize={26} />
                <p style={{ textAlign: "right", color: "red", margin: 0 }}>{this.props.numInCart}</p>
            </Button>
        </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shopType: state.shop.type,
        numInCart: state.cart.numInCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateShopType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);