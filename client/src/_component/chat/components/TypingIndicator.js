//pass a user who is typing object down to and render it properly
import React, { Component } from 'react'

class TypingIndicator extends Component {
  render() {
    if (this.props.usersWhoAreTyping.length > 0) { //no one is typing
      return (
        <div>
          {`${this.props.usersWhoAreTyping
            .slice(0, 2)
            .join(' and ')} is typing`} {/* show more than one user are typing */}
        </div>
      )
    }
    return <div />
  }
}

export default TypingIndicator