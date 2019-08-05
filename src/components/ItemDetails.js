import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Button } from  '@blueprintjs/core';

import { numToCurrency, calculateTotal } from './Helper.js';

const ItemDetails = (WrappedComponent) => {
    return class HOC extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                item: {}
            }
        }

        componentWillReceiveProps(nextProps){
            if (nextProps.viewingItem !== this.state.item){
                this.setState({ item: nextProps.viewingItem });
            }
        }

        chooseSize = (e) => {
            this.setState({
                ...this.state,
                item: {
                    ...this.state.item,
                    "choice-size": e.target.value
                }
            })
        }
    
        addToCart = (e, item) => {
            e.stopPropagation();
    
            this.props.addToCart(item);
    
        }

        chooseComponentChoice = (e, componentName) => {
            this.setState({
                ...this.state,
                item: {
                    ...this.state.item,
                    component: {
                        ...this.state.item.component,
                        [componentName]: {
                            ...this.state.item.component[componentName],
                            choice: e.target.value
                        }
                    }
                }
            })
        }
    
        renderComponent = (key, i) => {
            return(
                <label className={ "bp3-label-" + key } key={ key }>
                    { key }
                    <div className="bp3-select">
                        <select defaultValue={ this.state.item.component[key].choice }
                            onChange={ (e) => this.chooseComponentChoice(e, key) }>
                        {
                            this.state.item.component[key].amount.map((item, i) => {
                                    return <option value={ item } key={ item }>
                                    { item + this.state.item.component[key].modifier }
                                    </option>
                            })
                        }
                        </select>
                    </div>
                </label>
            );
        }

        render() {
            if (this.state.item.id === undefined)
                return null;
            else
                return(
                <WrappedComponent className="Shop-Drawer"
                    isOpen={ this.props.isViewerOpen }
                    onClose={ () => this.props.closeItemViewer() }>
                    <div>
                        {this.state.item.name}: 
                        {numToCurrency(calculateTotal(this.state.item), "USD")}
                    </div>
                    <img src={ this.state.item.image } alt={ this.state.item.name }/>
                    <div><p>{ this.state.item.description }</p></div>
                    <div className = "choice-container">
                        <label className="bp3-label-1">
                            Size
                            <div className="bp3-select">
                                <select defaultValue="M" onChange={ (e) => this.chooseSize(e) }>
                                    <option value = "S">Small</option>
                                    <option value = "M">Medium</option>
                                    <option value = "L">Large</option>
                                </select>
                            </div>
                        </label>
                        {
                            this.state.item["component-name"].map((key, i) => (
                                this.renderComponent(key, i)
                            ))
                        }
                        <div className="buy-bar" style={{ display: 'flex', justifyContent: "space-between", alignItems: "baseline", width: "100%" }}>
                            <Button icon="plus" minimal="true" onClick={ (e) => this.addToCart(e, this.state.item) } />
                        </div>
                    </div>
                </WrappedComponent>
                );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        // value: state.state.value,
    }
}

export default connect(mapStateToProps, null)(ItemDetails(Drawer));