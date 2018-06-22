import React from "react";
import { Link } from "react-router-dom";

class DashBoard extends React.Component {

    render() {
        return (
            <div>
                {"Here is dashboard"}
                <div className="fixed-action-btn">
                    <Link to="surveys/new" className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default DashBoard;