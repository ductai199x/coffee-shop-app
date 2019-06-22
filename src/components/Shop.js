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
            price: 0,
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

    calculateTotal = (item) => {
        var total = 0;
        var key = item.component;
        item["component-name"].map((name, i) => (
            total = total + (key[name]["price"][key[name].amount.indexOf(key[name].choice)])
        ))
        // this.state.price = total;
        total = total * item["scale-factor"][item["item-size"].indexOf(item["choice-size"])];
        total = Math.ceil(total *100)/100;
        return total
        // this.setState({ viewingItem: item});
    }

    chooseComponentChoice = (e, componentName) => {
        let tempItem = this.state.viewingItem;
        tempItem.component[componentName].choice = e.target.value;
        this.setState({ viewingItem: tempItem })
    }

    renderComponent = (key, i) => {
        return(
            <label className={"bp3-label-" + key}>
                {key}
                <div className="bp3-select">
                    <select onChange={(e) => this.chooseComponentChoice(e, key)}>
                    {
                        this.state.viewingItem.component[key].amount.map((item, i) => {
                            console.log(item);
                            console.log(this.state.viewingItem["choice-size"]);
                            if (item === this.state.viewingItem.component[key].choice){
                                return <option selected="selected" value={item}>{item
                                    + this.state.viewingItem.component[key].modifier}</option>
                            } else {
                                return <option value={item}>{item 
                                    + this.state.viewingItem.component[key].modifier} </option>
                            }
                        })
                    }
                    </select>
                </div>
            </label>
        );
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
                    this.state.viewingItem.id !== undefined
                    ? <Drawer className="Shop-Drawer"
                        isOpen={ this.state.isViewerOpen }
                        onClose={() => this.closeItemViewer() }>
                        <div>
                            {this.state.viewingItem.name}: 
                            {this.calculateTotal(this.state.viewingItem)}
                        </div>
                        <img src={ this.state.viewingItem.image }/>
                        <div><p>{ this.state.viewingItem.description }</p></div>
                        <div className = "choice-container">
                            <label className="bp3-label-1">
                                Size
                                <div className="bp3-select">
                                    <select onChange={(e) => this.chooseSize(e)}>
                                        <option value = "S">Small</option>
                                        <option selected="selected" value = "M">Medium</option>
                                        <option value = "L">Large</option>
                                    </select>
                                </div>
                            </label>
                            {
                                this.state.viewingItem["component-name"].map((item, i) => (
                                    this.renderComponent(item, i)
                                ))
                            }
                        </div>
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