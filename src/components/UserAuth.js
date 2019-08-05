import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Drawer, 
         Button, 
         AnchorButton,
         FormGroup, 
         InputGroup, 
         Tooltip, 
         Intent } from '@blueprintjs/core';

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
        provider = new firebase.auth.GoogleAuthProvider();

        componentWillReceiveProps(nextProps) {
            if (nextProps.user.id === undefined) {
                this.setState({showLogin: true, showLogout: false, showRegister: false, showForgotPwd: false});
            } else {
                this.setState({showLogin: false, showLogout: true, showRegister: false, showForgotPwd: false});
            }
        }

        attemptLogin = (email, password) => {
            return new Promise((resolve, reject) => {
                Object.keys(this.props.userdb.users).map((key) => {
                    if (email === this.props.userdb.users[key].email) {
                        resolve(this.props.userdb.users[key]);
                    }
                });
                reject("user not found");
            })
        }

        toggleUserRegistration = () => {
            this.setState({
                showLogin: !this.state.showLogin, 
                showLogout: false, 
                showRegister: !this.state.showRegister, 
                showForgotPwd: false
            });
        }

        // Mocking Loging in User API call
        handleLogin = (e) => {
            e.preventDefault();
            // const email = e.target.email.value;
            // const password = e.target.password.value;
            // this.attemptLogin(email, password)
            //     .then((data) => {
            //         
            //     })
            //     .catch((e) => {
            //         console.log(e)
            //     });
            this.auth.signInWithPopup(this.provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                console.log(user);
                this.props.loginUser(user);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
              
        }

        handleLogout = (e) => {
            this.auth.signOut().then(function() {
                // Sign-out successful.
                this.props.logoutUser()
              }).catch(function(error) {
                // An error happened.
              });
        }

        handleRegistration = (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

        }

        renderLogin = () => {
            return(
                <div className="Login">
                    {
                        this.state.showLogin
                            ? <UserLogin toggleUserRegistration={this.toggleUserRegistration} 
                                handleLogin={this.handleLogin}/>
                            : null
                    }
                    {
                        this.state.showRegister
                            ? <UserRegistration toggleUserRegistration={this.toggleUserRegistration} 
                                handleRegistration={this.handleRegistration}/>
                            : null
                    }
                    {
                        this.state.showForgotPwd
                            ? <UserForgotPwd toggleUserRegistration={this.toggleUserRegistration} />
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