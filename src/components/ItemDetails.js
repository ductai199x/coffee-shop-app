import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Button } from  '@blueprintjs/core';

import { calculateTotal } from './Helper.js';

const ItemDetails = (WrappedComponent) => {
    return class HOC extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                item: {}
            }
        }

        // shouldComponentUpdate(nextProps, nextState) {
        //     if (this.state.item !== nextProps.viewingItem) {
        //         let tempItem = Object.assign({}, nextProps.viewingItem);
        //         // this.setState({ nextState.item: tempItem });
        //         this.state.item = tempItem;
        //         return true;
        //     } else{
        //         return false;
        //     }
        // }

        componentWillReceiveProps(nextProps){
            if (nextProps.viewingItem !== this.state.item){
                this.setState({item: nextProps.viewingItem});
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
    
        chooseComponentChoice = (e, componentName) => {
            // let tempItem = this.state.item;
            // tempItem.component[componentName].choice = e.target.value;
            // this.setState({ item: tempItem })

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
                <label className={"bp3-label-" + key}>
                    {key}
                    <div className="bp3-select">
                        <select onChange={(e) => this.chooseComponentChoice(e, key)}>
                        {
                            this.state.item.component[key].amount.map((item, i) => {
                                if (item === this.state.item.component[key].choice){
                                    return <option selected="selected" value={item}>{item
                                        + this.state.item.component[key].modifier}</option>
                                } else {
                                    return <option value={item}>{item 
                                        + this.state.item.component[key].modifier} </option>
                                }
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
                    onClose={() => this.props.closeItemViewer() }>
                    <div>
                        {this.state.item.name}: 
                        {calculateTotal(this.state.item)}
                    </div>
                    <img src={ this.state.item.image }/>
                    <div><p>{ this.state.item.description }</p></div>
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
                            this.state.item["component-name"].map((item, i) => (
                                this.renderComponent(item, i)
                            ))
                        }
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