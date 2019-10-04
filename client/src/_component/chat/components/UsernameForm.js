//a component To collect the user's name
import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl';

class UsernameForm extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
   }
   this.onSubmit = this.onSubmit.bind(this)
   this.onChange = this.onChange.bind(this)
 }
//whenever the form is submitted:
 onSubmit(e) {
   e.preventDefault()
   this.props.onSubmit(this.state.username)
 }

//whenever the form is updated or change:
 onChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div>
        <div>
          <h2><FormattedMessage id='whatUsername' defaultMessage='What is your username?'/></h2>
          <form onSubmit={this.onSubmit}>
          <FormattedMessage id='YourUsername' defaultMessage="Your Username">
            {placeholder =>
            <input
              type="text"
              placeholder={placeholder}
              onChange={this.onChange}
            />}
            </FormattedMessage>
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}
 export default UsernameForm
