import React from 'react';

// ----- components -----
import Activty from './ticket/Activity';
import Attachments from './ticket/Attachements';
import Description from './ticket/Description';
import Info from './ticket/Info';
import InfoSideBar from './ticket/InfoSideBar';
import Options from './ticket/Options';
import Related from './ticket/Related';

export default class Ticket extends React.Component {
    render() {
        return (
            <div className="ticket">
                <h1>Title</h1>
                <Info />
                <Description />
                <Attachments />
                <Activty />
                <InfoSideBar />
                <Options />
                <Related />
            </div>
        )
    }
}