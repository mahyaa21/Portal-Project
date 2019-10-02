import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER , SET_COURSE } from './type';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => {
                 alert('user successfully added');
                 console.log(res.status);
                if(res.status === 200){
                    dispatch(setCourse('Ok'))
                }else{
                    dispatch(setCourse('Nok'))
                } 

        })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}


export const loginUser = (user,history) => dispatch => {
    axios.post('/api/users/login', user)
            .then(res => {
                const { token,role } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                //const {role} = this.props.auth.user
                //debugger
                console.log(role)
               // debugger
                switch(role){
                    
                    case 'student':
                        history.push('/student');
                        break;
                    case 'teacher':
                        history.push('/teacher');
                        break;
                    case 'admin':
                        history.push('/dashboard');
                        break;
                    default:
                        alert('you are not registerd!')   
                        break;         
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const setCourse = response => {
    return {
        type: SET_COURSE,
        payload:  response 
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    if(history){
        history.push('/');
    }
    
}