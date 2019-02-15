import React from 'react';

function ChatBar(props) {
    return (
      <footer   className="chatbar">
        <input  onKeyDown={props.handleChange}  value={props.currentUser} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input  onKeyDown={props.sendMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  
}
export default ChatBar;
