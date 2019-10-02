import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import DownloadHomwork from './DownloadHomeworks';
import UploadHomwork from './UploadHomeworks';

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      images: [],
    }

  }

  componentDidMount() {
   
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push('/');
    } else {
      this.props.history.push('/');
      alert('not authenticated')

    }


  }


  render() {
    const { images } = this.state;
    console.log(images);
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', flexDirection: 'column' }}>

      <DownloadHomwork />
      <UploadHomwork />


    </div>
  }
}




Teacher.propTypes = {
  //TeacherUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Teacher))