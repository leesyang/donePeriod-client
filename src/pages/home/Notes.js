import React from 'react';

// ----- components -----
import Note from './notes/Note';

export default class Notes extends React.Component {
    render() {
        const tempArray = [1,2,3,4,5,6,7,8,9]
        const entries = tempArray.map((num, index) => {
            return (
            <div className="note" key={index}>
              <Note num={num} />
            </div>)
        })
                
        return (
            <div className="notes">
                {entries}
            </div>
        )
    }
}