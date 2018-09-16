import React from 'react';

// ----- components -----
import NavButton from '../../components/navigation/NavButton';

export default class NavColumn extends React.Component {
    render() {
        return(
            <div className="nav-column">
                <NavButton name="asdf" />
                <NavButton name="asdf" />
                <NavButton name="asdf" />
            </div>
        )
    }
}