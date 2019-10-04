import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../App.scss'
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
//import Sidebar from 'react-bootstrap-sidebar';
import AddNewUser from './AddNewUser';
import { FaBars } from 'react-icons/fa';
class AdminSidebar extends Component {


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
                    <li><Link className="nav-link" to="/addnewuser">Add new user</Link></li>
                    <li><Link className="nav-link" to="/registercourseuser">Register Course User</Link></li>
                    <li><Link className="nav-link" to="/course">course Register</Link></li>
                    <li><Link className="nav-link" to="/chat">chat</Link></li>
                </ul>
            </div>
        </>
    }
    //     const collapsed = this.state.collapsed;
    //     const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    //     const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
    //     return (
    //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark transparent-nav">
    //     <div className="container">
    //     {/* <a className="navbar-brand" href="#">Rate My Neighborhood</a> */}
    //     <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
    //     <span className="navbar-toggler-icon" />
    //     </button>
    //     <div className={`${classOne}`} id="navbarResponsive">
    //     <ul className="navbar-nav ml-auto sidebarNav">
    //     <li className="nav-item active">
    //     <li><Link className="nav-link" to="/addnewuser">Add new user</Link></li>
    //     </li>
    //     <li className="nav-item">
    //     <Link className="nav-link" to="/course">Add new course</Link>
    //     </li>
    //     <li className="nav-item">
    //     <Link className="nav-link" to="/registercourseuser">register</Link>
    //     </li>
    //     </ul>
    //     </div>
    //     </div>
    //     </nav>
    //     );
        
    // }


    
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //       isVisible: false,
    //     };
    // }

    // updateModal(isVisible) {
    // 	this.state.isVisible = isVisible;
    //   this.forceUpdate();
    // }

    // render() {
    //     return (
    //           <div>
    //               {/* <Button bsStyle="primary" onClick={ () => this.updateModal(true) }><FaBars/></Button>
    //               <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
    //                 <Nav>
    //                   <NavItem href="#">Link 1</NavItem>
    //                   <NavItem href="#">Link 2</NavItem>
    //                   <NavItem href="#">Link 3</NavItem>
    //                   <NavItem href="#">Link 4</NavItem>
    //                 </Nav>
    //               </Sidebar> */}
    //           </div>
    //     );
    // }
}
AdminSidebar.propTypes = {
    
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(AdminSidebar));