import React from 'react';

// ----- css -----
import './Loader.css'

export default class Loader extends React.Component {
    render () {
        return (
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }
}