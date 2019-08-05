import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    Drawer, 
    Button, 
    // AnchorButton,
    // FormGroup, 
    // InputGroup, 
    // Tooltip, 
    // Intent 
} from '@blueprintjs/core';

import { loginUser, logoutUser } from '../actions/actions.js';

import UserLogin from './UserLogin.js';
import UserRegistration from './UserRegistration.js';
import UserForgotPwd from './UserForgotPwd.js';

import firebase from './Firebase.js';

import './css/UserAuth.css';

const UserAuth = (WrappedComponent) => {
    return class HOC extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                showLogin: false,
                showLogout: false,
                showRegister: false,
                showForgotPwd: false,
            }
        }

        auth = firebase.auth();
        googleAuthProvider = new firebase.auth.GoogleAuthProvider();

        componentWillReceiveProps(nextProps) {
            if (nextProps.user.id === undefined) {
                this.setState({showLogin: true, showLogout: false, showRegister: false, showForgotPwd: false});
            } else {
                this.setState({showLogin: false, showLogout: true, showRegister: false, showForgotPwd: false});
            }
        }

        toggleUserRegistration = () => {
            this.setState({
                showLogin: !this.state.showLogin, 
                showLogout: false, 
                showRegister: !this.state.showRegister, 
                showForgotPwd: false
            });
        }

        handleLoginUserPwd = (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            this.auth.signInWithEmailAndPassword(email, password).then((result) => {
                // The signed-in user info.
                const user = result.user;

                console.log(user);
                this.props.loginUser(user);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, errorCode, email, credential);
            });
        }

        handleLoginGoogle = (e) => {
            e.preventDefault();
            this.auth.signInWithPopup(this.provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                console.log(user);
                this.props.loginUser(user);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, errorCode, email, credential);
            });
        }

        handleLogout = (e) => {
            this.auth.signOut().then(() => {
                // Sign-out successful.
                this.props.logoutUser()
              }).catch((error) => {
                // An error happened.
              });
        }

        handleRegistration = (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
                console.log(result);
                this.toggleUserRegistration();
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage, errorCode);
              });
        }

        renderLogin = () => {
            return(
                <div className="Login">
                    {
                        this.state.showLogin
                            ?   <div>
                                    <UserLogin toggleUserRegistration = { this.toggleUserRegistration } 
                                        handleLoginUserPwd={ this.handleLoginUserPwd }
                                        handleLoginGoogle={ this.handleLoginGoogle }/>
                                </div>
                            : null
                    }
                    {
                        this.state.showRegister
                            ? <UserRegistration toggleUserRegistration={ this.toggleUserRegistration } 
                                handleRegistration={ this.handleRegistration }/>
                            : null
                    }
                    {
                        this.state.showForgotPwd
                            ? <UserForgotPwd toggleUserRegistration={ this.toggleUserRegistration } />
                            : null
                    }
                </div>
            )
        }

        renderLogout = () => {
            return(
                <div className="Logout-Panel">
                    <div className="goodbye">
                        Don't worry, all your information is safe with us. Please come back soon!
                    </div>
                    <Button text="Logout" icon="key" onClick={(e) => this.handleLogout(e)}/>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserAuth(Drawer));