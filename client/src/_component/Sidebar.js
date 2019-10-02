import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../_actions/authentication';
import { withRouter } from 'react-router-dom';
import StudentSidebar from '../_component/student/index'
import TeacherSidebar from '../_component/teacher/TeacherSidebar';
import AdminSidebar from '../_component/admin/AdminSidebar';

class Sidebar extends Component {



    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            // this.props.history.push('/');
        } else {
            this.props.history.push('/');
            alert('not authenticated')

        }
    }
    ChooseSidebar = () => {
        const { isAuthenticated, user } = this.props.auth;
        switch (user.role) {
            case 'student':
                return <div><StudentSidebar /></div>
            case 'teacher':
                return <div><TeacherSidebar /></div>
            case 'admin':
                return <div><AdminSidebar /></div>
            default:
                alert('you are not authenticated!');
                break;
        }

    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        return <>
            {!isAuthenticated ||
            <div className='Sidebar bg-dark'>
                  {this.ChooseSidebar()} 
            </div>}
        </>


    }
}
Sidebar.propTypes = {

    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Sidebar));