import React, {Component} from 'react';

class Message extends Component {
    render() { 
      if(this.props.message.type === "incomingNotification"){
        return(
          <div className="notification">
              <em className="notification-content">{this.props.message.content}</em>
          </div>
        );
      }  else {
          const colorStyle = {
            color: this.props.message.color
          }
;          return(
            <div className="message">
               <span  style={colorStyle} className="message-username">{this.props.message.username}</span>
                <span className="message-content">
                {this.props.message.content}
                <img className="message-image" src={this.props.message.image} />
                </span>
                
            </div>
          );
        }
    }
  }
  export default Message;
  