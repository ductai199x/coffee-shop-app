import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { exampleAction } from '../actions/actions.js';

import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        console.log(this.props)
        
    }

    exampleFunction() {
        this.props.exampleAction();
    }

    componentDidMount() {
        console.log("lmao")
        this.exampleFunction();
    }

    render() {
        return (
        <div className="App">
            <h1>Hello World. example prop:</h1>
            <p>{this.props.example1}</p>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        example1: state.example1,
        example2: state.example2,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ exampleAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
