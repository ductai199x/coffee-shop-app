import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        this.props.getShopItems();
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
        // value: state.shop.value,
    }
}

export default connect(mapStateToProps, null)(Home);