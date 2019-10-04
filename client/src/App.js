import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './_actions/authentication';
import store from './store';
import './App.scss';
import Register from './_component/register';
import Login from './_component/Login';
import Home from './_component/home';
import courseRegister from './_component/admin/courseRegister';
import Admin from './_component/admin/index';
import Navbar from './_component/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Teacher from './_component/teacher/teacher';
import student from './_component/student/student';
import Sidebar from './_component/Sidebar';
import AddNewUser from './_component/admin/AddNewUser';
import RegisterCourseUser from './_component/admin/registerCourseUser';
import DownloadHomework from './_component/student/DownloadHomeworks'
import UploadHomework from './_component/student/UploadHomeworks'


if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
  
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = '/login'
    }
  }
class App extends Component {
  render() {
   
    return (
      <Provider store = { store }>
        <Router>
            <div style={{height:'92.5%'}}>
                <Navbar/>
                <div style={{display:'flex',flexDirection:'row',height:'100%'}}>
                
                <Route exact path="/" component={ Home } />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/addnewuser" component={ AddNewUser } />
                  <Route exact path="/login" component={ Login } />
                  <Route path="/dashboard" component={Admin} />
                  <Route path='/course' component={courseRegister}/>
                  <Route path='/registercourseuser' component={RegisterCourseUser}/>
                  <Route path='/teacher' component={Teacher}/>
                  <Route path='/student' component={student}/>
                  <Route path='/download' component={UploadHomework}/>
                  <Route path='/upload' component={DownloadHomework}/>
                </div>
                 <Sidebar/> 
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}



export default App;

//export default App;



