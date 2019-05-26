import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
        <div>
            Example Component
            <p>{this.props.value}</p>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.state.value,
    }
}

export default connect(mapStateToProps, null)(Example);