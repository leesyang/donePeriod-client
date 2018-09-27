import React from 'react';
import { Link } from 'react-router-dom';

export default class Entry extends React.Component {
    render() {
        const { dueDate, ticketId, _id } = this.props.entry;
        const { onClick } = this.props;

        const dueDateObj = new Date(dueDate);
        const currentDate = Date.now();

        const dueIn = Math.round(Math.abs(dueDateObj - currentDate)/(24*60*60*1000));

        return (
            <div className="">
                <div className=""><Link to={`/issues/${ticketId}`}>{ticketId}</Link></div>
                <div className="">{dueIn} Days</div>
                <button onClick={() => onClick(_id)}>X</button> 
            </div>
        )

    }
}