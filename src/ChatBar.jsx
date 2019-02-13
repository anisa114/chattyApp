import React, {Component} from 'react';

class ChatBar extends Component {

   
  render() {
    // //Generate random ID
    // const generateRandomId = () => {
    //   return Math.random().toString(36).substr(2, 9);
    // }

    //grab the currentUser and messages 
    // const currentUser = this.props.currentUser.name;
    // const messages = this.props.messages;

    //Based on the currentUser, grab the user_id
    // let user_id = 0;
    // for(let i = 0; i < messages.length; i++){

    //   if(messages[i].username === currentUser){

    //     user_id = messages[i].user_id;
    //   }
    // }

  //  const keyPress = (e) => {
  //     if(e.keyCode == 13){
  //        //grab the content
  //       const contentInput = e.target
  //       const message = {
  //         id:generateRandomId(),
  //         user_id: user_id,
  //         username: this.props.currentUser.name,
  //         content: contentInput.value
  //       }
  //       //call the method and pass the message object
  //     this.props.addMessage(message);
  //     }
  //  }
    return (
        <footer   className="chatbar">
        <input onChange={this.props.changeUsername} value={this.props.currentUser} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input  onKeyDown={this.props.sendMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
