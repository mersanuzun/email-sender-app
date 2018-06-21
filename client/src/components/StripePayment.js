import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import {connect} from "react-redux";
import * as actions from "../actions";

class StripePayment extends React.Component {

    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="You will have 5 credits with 5$"
                token={this.props.sendStripeToken} 
                stripeKey = {process.env.REACT_APP_STRIPE_PUBLISBABLE_KEY}
                amount={500}
            />
        )
    }
}

export default connect(null, actions)(StripePayment);