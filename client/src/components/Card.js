import React, { Component } from 'react';
import "./Card.css"

class Card extends Component {
    
    render() { 
        return (
        <div onClick={this.props.onClick} className= 'fade-in-bounce card '>
            <div className="card2">
                <h1 className='Customeh1 '>{this.props.text}</h1>
            </div>
        </div>
        );
    }
}
 
export default Card;