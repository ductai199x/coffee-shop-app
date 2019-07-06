import React from 'react';
import { connect } from 'react-redux';
import { AnchorButton, Navbar, Alignment } from '@blueprintjs/core';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
        <div className="Header">
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Coffee Shop App</Navbar.Heading>
                    <Navbar.Divider />
                    <AnchorButton icon="home" text="Home" href="/" />
                    <AnchorButton icon="shop" text="Shop" href="/shop" />
                    <AnchorButton icon="user" text="Log In" onClick={() => this.props.toggleUserAuthDrawer()} />
                </Navbar.Group>
            </Navbar>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // value: state.shop.value,
    }
}

export default connect(mapStateToProps, null)(Header);