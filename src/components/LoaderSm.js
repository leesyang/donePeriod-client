import React from 'react';

// ----- css -----
import './LoaderSm.css'

export default class LoaderSm extends React.Component {
    render () {
        return (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    }
}