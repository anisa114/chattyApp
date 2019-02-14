import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  //Set initial state 
  constructor(props){
    super(props);
    //Assigning directly to state(*the only time*)
    this.state = {
      currentUser: {name: "Bob"},
      messages:[]
    }
  }

  
  // After the constructing id done
componentDidMount() {
  // Create WebSocket connection.
  this.socket = new WebSocket('ws://localhost:3001');
  // Connection opened
  this.socket.addEventListener('open', (e) => {
    console.log("Connected to Server");
  });

  //Handle message recieved from server
  this.socket.onmessage = (e) => {
    const messages = this.state.messages;
    const data = JSON.parse(e.data);
    switch(data.type) {
      case "incomingMessage":
      messages.push(data);
      this.setState({messages})
        break;
      case "incomingNotification":
        // handle incoming notification
        messages.push(data);
        this.setState({messages})
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  }
  //ComponentDidMount 
  console.log("componentDidMount <App />")
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = { id:"abc3" ,user_id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}


//Handle username change when user presses enter(Send to the server)
handleChange = (e) => {
  if(e.key === "Enter"){
    const currentUser = {
        name: e.target.value }
    const prevUser = this.state.currentUser.name;
    this.setState({currentUser}, ()=> {
      const usernameChange = {
          type: "postNotification",
          content: `${prevUser} changed their name to ${this.state.currentUser.name} `
      }
      this.socket.send(JSON.stringify(usernameChange));
    });
  }
}
//Send message to server
sendMessage = (e) => {
  if(e.key === "Enter"){
    const message = {
      type:"postMessage",
      content:e.target.value,
      username :this.state.currentUser.name
    }
    e.target.value = '';
    this.socket.send(JSON.stringify(message));
  }
}


  render() {
    return (
      <div>
      <MessageList messages={this.state.messages}/>
      <ChatBar handleChange = {this.handleChange} changeUsername = {this.changeUsername} sendMessage={this.sendMessage} cuurentUser={this.state.cuurentUser} />
      </div>
      
    );
  }
}
export default App;
