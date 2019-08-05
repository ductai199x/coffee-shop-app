import React from 'react';
import { 
        // Drawer, 
        // Button, 
        AnchorButton,
        // FormGroup, 
        // InputGroup, 
        // Tooltip, 
        // Intent 
    } from '@blueprintjs/core';

class UserForgotPwd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            large: false,
            showPassword: false,
            small: false,
        }
    }

    handleLockClick = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    render() {
        return(
            <div className="User-ForgotPwd">
                jdnwaodowon
                    <AnchorButton text="Forgot Password" minimal="true"/>
                    <AnchorButton text="Register New User" minimal="true" onClick={ this.props.toggleUserRegistration }/>
            </div>
        )
    }
}

export default UserForgotPwd;