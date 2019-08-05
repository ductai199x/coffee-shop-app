import React from 'react';
import {
    Icon,
    Button, 
    AnchorButton,
    FormGroup, 
    InputGroup, 
    Tooltip, 
    Intent,
} from '@blueprintjs/core';
import { 
    GoogleLoginButton,
    FacebookLoginButton
} from "react-social-login-buttons";

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
            <div className="Login-Panel">
                <form className="Login-Form" onSubmit={ (e) => this.props.handleLoginUserPwd(e) }>
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
                            disabled={ this.state.disabled }
                            placeholder="Enter your password..."
                            name="password"
                            rightElement={ lockButton }
                            type={ this.state.showPassword ? "text" : "password" }/>
                    </FormGroup>
                    <div className="Login-Btn-Div">
                        <Button className="UserPwd" type="submit"
                            style={ UserPwdLoginBtnStyle }>
                            <div style={{ alignItems: "center", display: "flex", height: "100%" }}>
                                <Icon icon="key" iconSize={24} color="white"/>
                                <div style={{ width: "10px" }}></div>
                                <div style={{ textAlign: "left", width: "100%" }}>Login</div>
                            </div>
                        </Button>
                        <GoogleLoginButton className="Google" iconSize="24px" onClick={ this.props.handleLoginGoogle }
                            style={ LoginBtnsStyle }/>
                        <FacebookLoginButton className="Facebook" iconSize="24px" onClick={ this.props.handleLoginFacebook }
                            style={ LoginBtnsStyle }/>
                    </div>
                </form>
                
                <AnchorButton text="Forgot Password" minimal="true"/>
                <AnchorButton text="Register New User" minimal="true" onClick={ this.props.toggleUserRegistration }/>
            </div>
        )
    }
}

export default UserLogin;

const LoginBtnsStyle = {
    border: "0px none", 
    borderRadius: "3px", 
    boxShadow: "rgba(0, 0, 0, 0.5) 0px 1px 2px",
    cursor: "pointer", 
    fontSize: "0.8rem", 
    margin: "5px 10px 5px 0px",
    width: "8rem", 
    overflow: "hidden", 
    padding: "0px 8px", 
    height: "35px", 
}

const UserPwdLoginBtnStyle = Object.assign({},
    LoginBtnsStyle,
    {
        color: "rgb(255, 255, 255)",
        background: "green none repeat scroll 0% 0%"
    }
);