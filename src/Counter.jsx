import React from 'react';

function Counter(props)  {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <img id="smiley" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/microsoft/153/smiling-face-with-smiling-eyes_1f60a.png"/>
        <div className="counter" >
            <span >{props.counts.content} users online</span>
        </div>
      </nav>
    );
  
}
export default Counter;
