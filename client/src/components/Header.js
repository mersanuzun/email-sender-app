import React from "react";
import { connect } from "react-redux";
import StripePayment from "./StripePayment.js";

class Header extends React.Component {

    render() {
        return (
            <div className="container">
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">Emaily</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {
                                this.props.user ? (
                                    [
                                        <li key="payment"><StripePayment /></li>,
                                        <li
                                            key="credits"
                                            style={
                                                { 
                                                    "marginLeft": "10px",
                                                    "marginRight": "10px"
                                                }
                                            }

                                        >
                                            Credits: {this.props.user.credits}
                                        </li>,
                                        <li key="name"> {this.props.user.displayName} </li>
                                    ]
                                ) : (

                                        <li><a href="/auth/google">Login with Google</a></li>
                                    )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(Header);