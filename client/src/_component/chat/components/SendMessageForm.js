//a copmonent to capture a text(sent message) by using a form
// is the same as theWhatIsYourUsernameForm component 
import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';

 class SendMessageForm extends Component {
   constructor(props) {
     super(props)
     this.state = {
       text: '',
     }
     this.onSubmit = this.onSubmit.bind(this)
     this.onChange = this.onChange.bind(this)
   }

   onSubmit(e) {
     e.preventDefault()
     this.props.onSubmit(this.state.text)
     this.setState({ text: '' })
   }

   onChange(e) {
     this.setState({ text: e.target.value })
     if (this.props.onChange) { //every time that the input is updated
       this.props.onChange()
     }
   }

   render() {
     const styles = {
       container: {
         padding: 20,
         borderTop: '1px #4C758F solid',
         marginBottom: 20,
       },
       form: {
         display: 'flex',
       },
       input: {
         color: 'inherit',
         background: 'none',
         outline: 'none',
         border: 'none',
         flex: 1,
         fontSize: 16,
       },
     }
     return (
       <div style={styles.container}>
         <div>
           <form onSubmit={this.onSubmit} style={styles.form}>
           <FormattedMessage id="typeMessage" defaultMessage="Type a message here then hit ENTER">
              {placeholder =>
             <input
               type="text"
               placeholder={placeholder}
               onChange={this.onChange}
               value={this.state.text}
               style={styles.input}
             />}
             </FormattedMessage>
           </form>
         </div>
       </div>
     )
   }
 }

 export default SendMessageForm