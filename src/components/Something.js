import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Button } from  '@blueprintjs/core';

import './css/cssSomething.css';
const data =[{"name":"test1"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"},{"name":"test2"}];

class Something extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const listItems = data.map((d, i) => <div className="somethingName" key={d.name}>{d.name}</div>);
        return(
        <div className="Something">
            {
                listItems
            }
            <p>{this.props.value}</p>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // value: state.state.value,
    }
}

export default connect(mapStateToProps, null)(Something);