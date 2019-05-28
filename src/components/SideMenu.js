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

    renderShopTypeTarget = () => {
        return(
            <Button className="item" minimal={true}>
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
            <Button className="item" minimal={true}>
                <Icon icon="menu" iconSize={26} />
            </Button>
            <Popover className="shop-type" position="right" 
                target={ this.renderShopTypeTarget() } 
                content={ this.renderShopTypeMenu() }
            />
            <Button className="item" minimal={true}>
                <Icon icon="shopping-cart" iconSize={26} />
            </Button>
        </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shopType: state.shop.type
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateShopType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);