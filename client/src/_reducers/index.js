import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import CourseResReducer from './CourseResReducer';
import locale from './locale';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    courseStatus: CourseResReducer,
    locale: locale
});