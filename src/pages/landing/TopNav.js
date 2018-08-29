import React from 'react';

// ----- components -----
import NavButton from '../../components/navigation/NavButton';

export default class TopNav extends React.Component {
    render () {
        return (
            <div className="top-nav">
                <NavButton name="Button"/>
                <NavButton name="Button"/>
            </div>
        )
    }
}