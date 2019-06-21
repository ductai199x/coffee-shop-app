import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Button } from  '@blueprintjs/core';

import './css/UserAuth.css';

const UserAuth = (WrappedComponent) => {
    return class HOC extends React.Component {
        constructor(props) {
            super(props);

            this.state = {

            }
        }

        render() {
            return(
            <WrappedComponent {...this.props}>
                <Button icon="cross" >

                </Button>
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
// export default ;
export default connect(mapStateToProps, null)(UserAuth(Drawer));