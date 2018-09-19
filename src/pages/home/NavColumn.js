import React from 'react';
import { Link } from 'react-router-dom';

export default class NavColumn extends React.Component {
    render() {
        return(
            <div className="nav-column">
                <a className="nav-column-link">Feed</a>
                <a className="nav-column-link">Notes</a>
            </div>
        )
    }
}