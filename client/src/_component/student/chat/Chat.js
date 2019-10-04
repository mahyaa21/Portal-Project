import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//import { registerUser } from '../_actions/authentication';
class Chat extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    const {user} = this.props.auth;
    fetch('/api/users/chat', { //send a POST request to lacallhost port 3001/users(/users route we just defined)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: user/* JSON.stringify({ user }) */,
    })
    //response:
      .then(response => {
        this.setState({ //request is successful
          currentUsername: user.name,
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
    
   Chat.propTypes = {
      //registerUser: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
      errors: state.errors,
      auth: state.auth,
      courseStatus: state.courseStatus
  });
  
  export default connect(mapStateToProps)(withRouter(Chat))
