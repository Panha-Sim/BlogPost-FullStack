import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./ReadingBut.css"
class ReadingBut extends Component {
    render() { 
        return (
        <div className='buttonWrapper'>
            <Link to='/toGenre'>
                <button className='startReading'>Start Reading</button>
            </Link>
        </div>);
    }
}
 
export default ReadingBut;