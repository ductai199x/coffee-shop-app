import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';

import { increment, decrement } from '../actions/actions.js';

import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    exampleFunction = () => {
        this.props.increment();
    }

    exampleFunction2 = () => {
        this.props.decrement();
    }

    render() {
        return (
        <div className="App">
            <h1>Hello World. example prop:</h1>
            <p>{this.props.value}</p>
            <Button onClick={() => this.exampleFunction() } text="haha"/>
            <Button onClick={() => this.exampleFunction2() } text="hihi"/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.state.value,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ increment, decrement }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
