import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Counter from './Counter.jsx'

class App extends Component {
  //Set initial state 
  constructor(props){
    super(props);
    //Assigning directly to state(*the only time*)
    this.state = {
      currentUser: {
        name: "Bob" ,
        color: null
      },
      messages:[],
      counts:{}
      
    }
  }
  // After the constructing id done
componentDidMount() {
  // Create WebSocket connection.
  this.socket = new WebSocket('ws://localhost:3001');
  // Connection opened
  this.socket.addEventListener('open', (e) => {



    console.log("Connected to Server");
    const userCountObj = {
      type:"UserCount",
      content :1,
      username: this.state.currentUser.name
    }
    this.socket.send(JSON.stringify(userCountObj));

    const userColor = {
      type:"Color",
      username: this.state.currentUser.name,
      color:this.state.currentUser.color
      
    }
    this.socket.send(JSON.stringify(userColor));
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
        case "incomingUserCount":
        // handle incoming notification    
        const count = {
          type: data.type,
          content : data.content
        }
        this.setState({counts:count})
        break;
        case "colorChange":
        // handle incoming notification    
        const currentUser= {
          name: data.username,
          color: data.color
        }
        this.setState({currentUser})
        break;
        
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  }
  //ComponentDidMount 
  console.log("componentDidMount <App />")

}

//Handle username change when user presses enter(Send to the server)
handleChange = (e) => {
  if(e.key === "Enter"){
    const currentUser = {
        name: e.target.value,
        color:this.state.currentUser.color
       }
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
      username :this.state.currentUser.name,
      color: this.state.currentUser.color
    }
    e.target.value = '';
    this.socket.send(JSON.stringify(message));
  }
}


  render() {
    
    return (
      <div>
        <Counter  counts={this.state.counts}/>
      <MessageList currentUser={this.state.currentUser} messages={this.state.messages}/>
      <ChatBar handleChange = {this.handleChange} changeUsername = {this.changeUsername} sendMessage={this.sendMessage} cuurentUser={this.state.cuurentUser} />
      </div>
      
    );
  }
}
export default App;
