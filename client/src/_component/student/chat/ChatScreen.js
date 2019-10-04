//Once the username has been submitted, 
//we'll want to transition to a different screen(chat screen) 
import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUsername,
      currentRoom: {},
     messages: [],
     usersWhoAreTyping: [], //multiple users typing at the same time
    }
    this.sendMessage = this.sendMessage.bind(this)
    //this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  // sendTypingEvent() {
  //       this.state.currentUser //access the current user
  //         .isTypingIn({ roomId: this.state.currentRoom.id }) //specify the room id that the user typing in
  //         .catch(error => console.error('error', error))
  //     }
  
  sendMessage(text) { //takes some texts
        this.state.currentUser.sendMessage({ //access current user
          text,
          roomId: 'd972f236-7c4f-4056-ae97-4888b9df2fc7',
        })
      }

  componentDidMount () {
    const chatManager = new Chatkit.ChatManager({ //create a new chat chatManager
      instanceLocator: 'v1:us1:d8e95432-dbb2-4e8f-8b0b-f0b97789a88c',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: '/api/users/chat/authenticate', //point to the server
      }),
    })

    //instantiate our Chatkit ChatManager with our instanceLocator, 
    //userId (from this.props.currentUsername), and a custom TokenProvider. 
    //The TokenProvider points to the /authenticate route we defined earlier
    
    chatManager //is called each time a new message arrives
      .connect() //connect happens asynchronously and a Promise is returned
      .then(currentUser => {
        this.setState({ currentUser }) //set the current user
        return currentUser.subscribeToRoom({
                      roomId: "d972f236-7c4f-4056-ae97-4888b9df2fc7", //copy the room that is created in chatkit by its id
                      messageLimit: 100, // number of kept messages
                      hooks: {
                        onMessage: message => { //when new message is received
                          this.setState({
                            messages: [...this.state.messages, message], //add the message to the existing ones
                          })
                        },
                        onUserStartedTyping: user => { //when user starts typing
                                          this.setState({ //add the username to the user typing array
                                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                                         })
                                        },
                                        onUserStoppedTyping: user => { //when user stops typing
                                          this.setState({ //remove the username from the user typing array
                                            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                              username => username !== user.name
                                            ),
                                          })
                                        },
                                        onPresenceChange: () => this.forceUpdate(),
                      },
                    })
                  })
                  .then(currentRoom => { 
                    this.setState({ currentRoom }) //gives wider access to the current room and current user properties
                   })
      .catch(error => console.error('error', error))
  }
 
      render() {
            const styles = {
              container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
              },
              chatContainer: {
                display: 'flex',
                flex: 1,
              },
              whosOnlineListContainer: {
                width: '300px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: 'white',
              },
              chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
              },
           }
        
           return (
            <div style={styles.container}>
              <div style={styles.chatContainer}>
                <aside style={styles.whosOnlineListContainer}>
                <WhosOnlineList 
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users} //this user property is always up to date
            />
                </aside>
                <section style={styles.chatListContainer}>
                  <MessageList
                    messages={this.state.messages}
                    style={styles.chatList}
                  />
                  <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} /> {/* specify users who are typing */}
                <SendMessageForm 
                onSubmit={this.sendMessage}
                onChange={this.sendTypingEvent} //every time the value is updated we are going to send a typing event
                 />
                </section>
              </div>
            </div>
          )
        }
      }
      
      export default ChatScreen