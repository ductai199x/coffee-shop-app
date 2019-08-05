import React from 'react';
import { 
    // Drawer, 
    Button, 
    // AnchorButton,
    FormGroup, 
    InputGroup, 
    Tooltip, 
    Intent 
} from '@blueprintjs/core';

class UserRegistration extends React.Component {
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
            <Tooltip content={ `${this.state.showPassword ? "Hide" : "Show"} Password` } disabled={ this.state.disabled }>
                <Button
                    disabled={ this.state.disabled }
                    icon={ this.state.showPassword ? "unlock" : "lock" }
                    intent={ Intent.WARNING }
                    minimal={ true }
                    onClick={ this.handleLockClick }
                />
            </Tooltip>
        );
        return(
            <div className="User-Registration">
                <form className="Registration-Form" onSubmit={ (e) => this.props.handleRegistration(e) }>
                    <div className="greetings">
                        Join us now. Easy and Efficient!
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
                            disabled={ this.state.disabled }
                            placeholder="Enter your password..."
                            name="password"
                            rightElement={ lockButton }
                            type={ this.state.showPassword ? "text" : "password" }/>
                    </FormGroup>
                    <FormGroup
                        label="Your Name"
                        labelFor="login-name">
                        <InputGroup id="login-name"
                            required
                            placeholder="Enter your name..."
                            name="name"
                            type="text"/>
                    </FormGroup>
                    <Button text="Back" icon="arrow-left" onClick={ this.props.toggleUserRegistration }/>
                    <Button text="Register" icon="key" type="submit"/>
                </form>
            </div>
        )
    }
}

export default UserRegistration;