import React from 'react';
import Login from './Login';
import Register from './register';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../_actions/authentication';
import { withRouter } from 'react-router-dom';

 class Home extends React.Component{

    constructor(props){
        super(props)
    }
    checkRoute = () =>{
      /*   const {role} = this.props.auth.user

        switch(role){
            case 'student':
                this.props.history.push('/student');
            case 'teacher':
                this.props.history.push('/teacher');
            case 'admin':
                this.props.history.push('/admin');
            default:
                alert('you are not registerd!')            
        } */
    }
    render(){
        const {isAuthenticated, user} = this.props.auth;
        return<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        
      {/*   {!isAuthenticated || <Sidebar/>} */}
        
    </div>
    }
    
}
Home.propTypes = {
    //registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    courseStatus: state.courseStatus
});

export default connect(mapStateToProps)(withRouter(Home))
