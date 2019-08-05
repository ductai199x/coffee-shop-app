import React from 'react';
import { Drawer, 
        Button, 
        AnchorButton,
        FormGroup, 
        InputGroup, 
        Tooltip, 
        Intent } from '@blueprintjs/core';

class UserLogin extends React.Component {
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
        const lockButton = (
            <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`} disabled={this.state.disabled}>
                <Button
                    disabled={this.state.disabled}
                    icon={this.state.showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={this.handleLockClick}
                />
            </Tooltip>
        );
        return(
            <div className="Login-Panel">
                <form className="Login-Form" onSubmit={(e) => this.props.handleLogin(e)}>
                    <div className="greetings">
                        Good morning! Let's log in so that we can create the best experience for you!
                    </div>
                    <FormGroup
                        label="Your Email"
                        labelFor="login-email">
                        <InputGroup id="login-email"
                            required
                            placeholder="Enter your email..."
                            name="email"
                            type="text"/>
                    </FormGroup>
                    <FormGroup
                        label="Your Password"
                        labelFor="login-password">
                        <InputGroup id="login-password"
                            required
                            disabled={this.state.disabled}
                            placeholder="Enter your password..."
                            name="password"
                            rightElement={lockButton}
                            type={this.state.showPassword ? "text" : "password"}/>
                    </FormGroup>
                    <Button text="Login" icon="key" type="submit"/>
                </form>
                <AnchorButton text="Forgot Password" minimal="true"/>
                <AnchorButton text="Register New User" minimal="true" onClick={this.props.toggleUserRegistration}/>
            </div>
        )
    }
}

export default UserLogin;