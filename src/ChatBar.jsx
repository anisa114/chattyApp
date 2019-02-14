import React, {Component} from 'react';

class ChatBar extends Component {

   
  render() {
    return (
        <footer   className="chatbar">
        <input  onKeyDown={this.props.handleChange}  value={this.props.currentUser} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input  onKeyDown={this.props.sendMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
