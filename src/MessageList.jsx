import React, {Component} from 'react';
import Message from './Message.jsx'


function MessageList(props)  {  
      const messages = props.messages.map((message) => {
        return <Message key={message.id} message={message}/>
      });
      return (
        <main className="messages">
          <div>{messages}</div>
          <div className="message system"></div>
      </main>
      );
  }
  export default MessageList;
  