import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../App.scss'
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
//import Sidebar from 'react-bootstrap-sidebar';
// import Upload from './Upload';
import { FaBars } from 'react-icons/fa';
import {FormattedMessage} from 'react-intl';

class TeacherSidebar extends Component {


    // constructor(props) {
    //     super(props);
    //     this.toggleNavbar = this.toggleNavbar.bind(this);
    //     this.state = {
    //     collapsed: true,
    //     };
    //     }
    //     toggleNavbar() {
    //     this.setState({
    //     collapsed: !this.state.collapsed,
    //     });
    //     }
    

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
           // this.props.history.push('/');
        }else{
            this.props.history.push('/');
            alert('not authenticated')
           
        }
    }
   

    render() {
        const {isAuthenticated, user} = this.props.auth;
        return<>
       
            <div>
                <ul>
                    <li><Link className="nav-link" to="/download"><FormattedMessage id='Upload' defaultMessage='Upload'/></Link></li>
                    <li><Link className="nav-link" to="/upload"><FormattedMessage id='Download' defaultMessage='Download'/></Link></li>
                </ul>
            </div>
        </>
    }
    
}
TeacherSidebar.propTypes = {
    
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(TeacherSidebar));