import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, Button, FormGroup, InputGroup, Tooltip, Intent } from  '@blueprintjs/core';

import { loginUser, logoutUser } from '../actions/actions.js';

import './css/UserAuth.css';

const UserAuth = (WrappedComponent) => {
    return class HOC extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                disabled: false,
                large: false,
                showPassword: false,
                small: false,
            }
        }

        attemptLogin = (email, password) => {
            return new Promise((resolve, reject) => {
                Object.keys(this.props.userdb.users).map((key) => {
                    if (email === this.props.userdb.users[key].email) {
                        resolve(this.props.userdb.users[key]);
                    }
                });
                console.log("??")
                reject("user not found");
            })
        }

        // Mocking Loging in User API call
        handleLogin = (e) => {
            console.log(e)
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            this.attemptLogin(email, password)
                .then((data) => {
                    console.log(data);
                    this.props.loginUser(data);
                    return;
                })
                .catch((e) => {
                    console.log(e)
                });
            
        }

        handleLockClick = () => {
            this.setState({ showPassword: !this.state.showPassword });
        }

        renderLogin = () => {
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
                <form className="Login-Panel" onSubmit={(e) => this.handleLogin(e)}>
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
                            // rightElement={lockButton}
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
            )
        }

        renderLogout = () => {
            return(
                <div></div>
            )
        }

        render() {
            return(
            <WrappedComponent className="UserAuth-Drawer" 
                {...this.props}>
                <Button className="close-button" 
                    icon="cross" minimal="true"
                    onClick={() => this.props.onClose() }/>
                {
                    this.props.user.id === undefined
                    ? this.renderLogin()
                    : this.renderLogout()
                }
            </WrappedComponent>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userdb: state.userdb
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loginUser, logoutUser }, dispatch);
}

// export default ;
export default connect(mapStateToProps, null)(UserAuth(Drawer));