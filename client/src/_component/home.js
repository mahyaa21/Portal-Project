import React from 'react';
import Login from './Login';
import Register from './register';

export default class Home extends React.Component{

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
        return<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        
        {this.checkRoute()}
        
    </div>
    }
    
}
