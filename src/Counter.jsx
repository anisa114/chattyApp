import React, {Component} from 'react';

class Counter extends Component {

   
  render() {
      
    return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div>
            <span className="counter">{this.props.counts.content} users online</span>
        </div>
      </nav>
    );
  }
}
export default Counter;
