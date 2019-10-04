import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', { //send a POST request to lacallhost port 3001/users(/users route we just defined)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    //response:
      .then(response => {
        this.setState({ //request is successful
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      })
      //request fails
      .catch(error => console.error('error', error))
  }

  render() {
        if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
          return <UsernameForm onSubmit={this.onUsernameSubmitted} />
        }
        if (this.state.currentScreen === 'ChatScreen') {
          return <ChatScreen currentUsername={this.state.currentUsername} />
        }
      }
    }
    
    export default App
