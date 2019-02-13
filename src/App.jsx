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

  this.socket.onmessage = (e) =>{
    const message = JSON.parse(e.data);
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages})
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

//changeUsername 
changeUsername = (e) =>  {
  const currentUser = {
  name: e.target.value}
  this.setState({currentUser})
}

//Send message to server
sendMessage = (e) => {
  if(e.key === "Enter"){
    const message = {
      type:"sendMessage",
      content:e.target.value,
      username :this.state.currentUser.name
    }
    e.target.value = '';
    this.socket.send(JSON.stringify(message));
  }
}

// //Method to add message 
//  addMessage = (message) => {
//   const oldMessages = this.state.messages;
//   const newMessages = [...oldMessages, message];
//   this.setState({messages: newMessages});
// }
  render() {
    return (
      <div>
      <MessageList messages={this.state.messages}/>
      <ChatBar changeUsername = {this.changeUsername} sendMessage={this.sendMessage} cuurentUser={this.state.cuurentUser} />
      </div>
      
    );
  }
}
export default App;
