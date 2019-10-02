import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from './setAuthToken';
// import { setCurrentUser, logoutUser } from './_actions/authentication';
import './App.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Register from './_component/register';
import Login from './_component/Login';
import Home from './_component/home';
import newCourse from './_component/admin/newCourse';
import Admin from './_component/admin/index';
import Navbar from './_component/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Teacher from './_component/teacher/Admin';
import student from './_component/student/Admin';
import {IntlProvider} from 'react-intl';
import messages from './messages';



class App extends Component {
  render() {
    const {lang} = this.props;
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <Router>
            <div>
                <Navbar/>
                <Route exact path="/" component={ Home } />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route path="/dashboard" component={Admin} />
                  <Route path='/course' component={newCourse}/>
                  <Route path='/teacher' component={Teacher}/>
                  <Route path='/student' component={student}/>
                </div>
            </div>
          </Router>
        </IntlProvider>
    );
  }
}

App.propTypes = {
  lang: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  lang: state.locale.lang
})

export default connect(mapStateToProps)(withRouter(App));



