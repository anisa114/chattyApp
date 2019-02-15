import React from 'react';

function Counter(props)  {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div>
            <span className="counter">{props.counts.content} users online</span>
        </div>
      </nav>
    );
  
}
export default Counter;
