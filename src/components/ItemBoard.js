import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Card } from  '@blueprintjs/core';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

import './css/ItemBoard.css';

class ItemBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: "grid"
        }
    }

    renderItem = (key) => {
        return(
            <Card className={key.id + " cell "} key={key.id} interactive={true}>
                <LazyLoadImage 
                    className="Shop-Item"
                    alt={key.name}
                    effect="blur"
                    placeholder={<div className="bp3-skeleton"></div>}
                    src={key.image}
                    width={"calc(100% - 32px)"}
                    height={"calc(100% - 32px)"}
                />
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