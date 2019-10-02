import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }

  }
 
  onChangeHandler = event => {

    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

  }
  onClickHandler = () => {

    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("/api/users/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }
  
  componentDidMount() {
    console.log(this.state.selectedFile);
    if(this.props.auth.isAuthenticated) {
        //this.props.history.push('/');
    }else{
        this.props.history.push('/');
        alert('not authenticated')
       
    }
} 
  render() {
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px',flexDirection:'column'}}>

    <input type="file" style={{width:'30%',}} name="file" onChange={this.onChangeHandler} />
    <button type="button" style={{width:'30%',}} class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

  </div>
  }
}




Student.propTypes = {
  //StudentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Student))