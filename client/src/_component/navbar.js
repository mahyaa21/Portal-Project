import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../_actions/authentication';
import { withRouter } from 'react-router-dom';
import '../App.scss';
import {FormattedMessage} from 'react-intl';
import {setLocale} from '../_actions/locale';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

   /*  componentDidMount() {
        if(this.props.auth.isAuthenticated) {
           // this.props.history.push('/');
        }else{
            this.props.history.push('/');
            alert('not authenticated')
           
        }
    } */

    render() {
        const {isAuthenticated, user} = this.props.auth;
        //console.log(user);
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                           {user.name} <FormattedMessage id='Logout' defaultMessage='Logout'/>
                </a>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register"><FormattedMessage id='nav.SignUp' defaultMessage='Sign Up'/></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login"><FormattedMessage id='nav.SignIn' defaultMessage='Sign In'/></Link>
            </li>
        </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg  bg-dark">
                <Link className="navbar-brand" to="/"><FormattedMessage id='Login/Register' defaultMessage='Login/Register'/></Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
                <div className="nav-item">
                    <a role='button' onClick={()=> this.props.setLocale('en')}><FormattedMessage id='nav.enlanguage' defaultMessage='EN'/></a>| 
                    <a role='button' onClick={()=> this.props.setLocale('fa')}><FormattedMessage id='nav.falanguage' defaultMessage='FA'/></a>
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser  , setLocale })(withRouter(Navbar));