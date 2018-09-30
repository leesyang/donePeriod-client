import React from 'react';

export default class WorkLog extends React.Component {
    render () {
        return (
            <div className="worklog-container">
                <form id="commentForm" onSubmit="">
                    <input></input>
                </form>
                <textarea id="commentForm" rows="4" cols="50" name="comment"></textarea>
            </div>
        )
    }
}