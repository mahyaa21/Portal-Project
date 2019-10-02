import axios from 'axios';
import { GET_ERRORS, SET_COURSE } from './type';
import store from '../store/index'

export const registerCourse = (course, history) => dispatch => {
    axios.post('/api/users/courses/create', course)
            .then(res => {
                alert('course successfully added!')
                console.log(res.status);
                if(res.status === 200){
                    dispatch(setCourse('Ok'))
                }else{
                    dispatch(setCourse('Nok'))
                }
                //return res.status;
            } )
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload:  ((err||{}).response||{}).data || 'Error unexpected'
                });
            });
}

export const registerCourseUser = (CourseUser, history) => dispatch => {
    axios.post('/api/users/courses-user/create', CourseUser)
            .then(res => {
                alert(`${res} successfully registered!`)
                 console.log(res.status);
                if(res.status === 200){
                    dispatch(setCourse('Ok'))
                }else{
                    dispatch(setCourse('Nok'))
                } 
                //return res.status;
            } )
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload:  ((err||{}).response||{}).data || 'Error unexpected'
                });
            });
}

export const setCourse = response => {
    return {
        type: SET_COURSE,
        payload:  response 
    }
}