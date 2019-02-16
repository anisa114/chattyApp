import React from 'react';

function Message(props)  {
      if(props.message.type === "incomingNotification"){
        return(
          <div className="notification">
              <em className="notification-content">{props.message.content}</em>
          </div>
        );
      }  else {
          const colorStyle = {
            color: props.message.color
          };          
            return(
              <div >
                <div className="message">
                  <span  style={colorStyle} className="message-username">{props.message.username}</span>
                    <span className="message-content">
                    {props.message.content}
                    </span>
                </div>
                  {props.message.image && <img className="message-image" src={props.message.image} />}
              </div>
            );
        }
        
  }
  export default Message;
  