import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import StripePayment from "./StripePayment.js";

class Header extends React.Component {

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Emaily</Link>
                    
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
                                    <li key="name">
                                        <a href="/auth/logout"> {"Logout"} </a>
                                    </li>
                                ]
                            ) : (

                                    <li><a href="/auth/google">Login with Google</a></li>
                                )
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Header);