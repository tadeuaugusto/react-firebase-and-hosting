import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './fire';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentWillMount() {
    // 1. create reference to messages in Firebase database
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      // 2. update React state when message is added at Firebase Database
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }

  addMessage(e) {
    // 3. prevent form submit from reloading the page
    e.preventDefault();

    // 4. send the message to Firebase
    fire.database().ref('messages').push(this.inputEl.value);

    // 5. clear the input element
    this.inputEl.value = '';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <form onSubmit={this.addMessage.bind(this)}>
          <input type="text" ref={ el => this.inputEl = el }/>
          <input type="submit"/>
          <ul>
            { /* Render the list of messages */
              this.state.messages.map( (message) => {
                return (
                  <li key={message.id}>{message.text}</li>
                )
              })
            }
          </ul>
        </form>

      </div>
    );
  }

  
}

export default App;
