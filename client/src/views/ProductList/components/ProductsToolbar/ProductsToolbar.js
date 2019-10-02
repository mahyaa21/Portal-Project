import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerCourse } from '../../../../_actions/index';
import classnames from 'classnames';
import Axios from 'axios';
import { MDBBtn } from "mdbreact";
import {FormattedMessage} from 'react-intl';

class RegisterCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: '',
            teacher: '',
            teachers: [],
            courses: [],
            contacts: [] ,
            errors: {}
        }
        this.result = 0;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { courses } = this.state;
        const course = {
            name: this.state.name,
            status: this.state.status,
            teacher: this.state.teacher
        }
        console.log(course);
        this.setState({ courses: [...courses, course] });
        this.props.registerCourse(course, this.props.history);
    }

    EditeCourse = (id) =>{
        Axios.put('/api/edit'+ id).then(response=>{})
    }

    deleteCourse = (index) =>{
        let contacts = [...this.state.contacts];
        contacts.splice(index, 1);
        this.setState({contacts});
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentWillMount() {
        Axios.get('/api/users/teacher').then(res => {
            this.setState({ teachers: [...res.data] })
        }).catch(err => console.log('axios for getting teachers has err:' + err))
    }

    componentDidMount() {
        //this.result = this.props.resStatus;
        //console.log('result:' + this.result)
    }

    createCourseAdded = () => {
        const { courses } = this.state;
        const { resStatus } = this.props.courseStatus;
        this.result = (resStatus == 'Ok') ? true : false;
        console.log('resstause: '+ resStatus)
        console.log('result: '+this.result);
        return <>
            {!this.result || <table>
                <tbody>
                <tr>
                    <th><FormattedMessage id='name' defaultMessage='name'/></th>
                    <th><FormattedMessage id='teacher' defaultMessage='teacher'/></th>
                    <th><FormattedMessage id='status' defaultMessage='status'/></th>
                </tr>
                
                    {courses.map(course=>{
                        return <tr key={course.id} id={course.id}>
                            <td>{course.name}</td>
                            <td>{course.teacher}</td>
                            <td>{course.status}</td>
                            <td><MDBBtn onClick={this.EditeCourse(course.id)} color='info'><FormattedMessage id='Edit' defaultMessage='Edit'/></MDBBtn>  
                            <MDBBtn onClick={this.deleteCourse} color='danger'><FormattedMessage id='delete' defaultMessage='delete'/></MDBBtn></td>
                        </tr> 
                    })}
               </tbody>
            </table>}
        </>
    }


    render() {
        const { errors, teachers } = this.state;
        //console.log(teachers);
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}><FormattedMessage id='Registration' defaultMessage='Registration'/></h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>

                    <div className="form-group">
                        <select name="status" id="statu
s" className="form-control" onChange={this.handleInputChange}>
                            <option value='notdefine'><FormattedMessage id='chooseStatus' defaultMessage='choose status'/></option>
                            <option value="I" key='I'><FormattedMessage id='Inprogress' defaultMessage='Inprogress'/></option>
                            <option value="D" key='D'><FormattedMessage id='Done' defaultMessage='Done'/></option>
                        </select>
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>

                    <div className="form-group">

                        <select name="teacher" id="teacher" className="form-control" onChange={this.handleInputChange}>

                            <option value='notdefine'><FormattedMessage id='chooseTeacher' defaultMessage='choose teacher'/></option>    
                            {teachers.map(teacher => {
                                return <option value={teacher.id} key={teacher.id}>{teacher.name}</option>
                            })}

                        </select>
                        {errors.role && (<div className="invalid-feedback">{errors.role}</div>)}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                        <FormattedMessage id='RegisterCourse' defaultMessage='Register Course'/>
                    </button>
                    </div>
                </form>

                <div>
                    {this.createCourseAdded()}
                </div>
            </div>
        )
    }
}

RegisterCourse.propTypes = {
    registerCourse: PropTypes.func.isRequired,
   // resStatus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    courseStatus: state.courseStatus
});

export default connect(mapStateToProps, { registerCourse })(withRouter(RegisterCourse))