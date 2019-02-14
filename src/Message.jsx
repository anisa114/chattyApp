import React, {Component} from 'react';


class Message extends Component {
    render() { 
      if(this.props.message.type ==="postNotification"){
        return(
   <div className="notification">
      <span className="notification-content">Anonymous1 changed their name to nomnom.</span>
   </div>
        );
      }  else {
          return(
            <div className="message">
               <span className="message-username">{this.props.message.username}</span>
                <span className="message-content">{this.props.message.content}</span>
            </div>
          );
        }
    }
  }
  export default Message;
  