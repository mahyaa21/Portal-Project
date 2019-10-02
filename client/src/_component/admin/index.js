import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { chartjs } from '../../_helper';
//import theme from '../../theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../App.scss';
import validators from '../../common/validators';
import Sidebar from '../Sidebar';
//import Routes from '../../Routes';


const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

class Admin extends Component {

  constructor(props){
    super(props)
  }
     componentDidMount() {
        if(this.props.auth.isAuthenticated) {
           // this.props.history.push('/');
        }else{
            this.props.history.push('/');
            alert('not authenticated')
           
        }
    } 
  render() {
    return (
     /*  <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          
          <Routes />
        </Router>
      </ThemeProvider> */
      <div className='mainPage'>
        <h1>hello</h1>
        <div></div>
      </div>
      
    );
  }
}

Admin.propTypes = {
  //AdminUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Admin))
