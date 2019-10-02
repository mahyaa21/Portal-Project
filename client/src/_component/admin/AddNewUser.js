import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../_actions/authentication';
import classnames from 'classnames';
import { MDBBtn } from "mdbreact";

class AddNewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            role: '',
            users: [],
            errors: {}
        }
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
        const { users } = this.state;
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            role: this.state.role
        }
        console.log(user);
        console.log(this.state.users)
        this.setState({ users: [...users, user] });
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            // this.props.history.push('/');
        } else {
            // this.props.history.push('/');
            // alert('not authenticated')

        }
    }

    Editeuser = () => {

    }

    deleteuser = () => {

    }

    createUserAdded = () => {
        const { users } = this.state;
        const { resStatus } = this.props.courseStatus;
        this.result = (resStatus == 'Ok') ? true : false;
        console.log('resstause: ' + resStatus)
        console.log('result: ' + this.result);
        return <>
            {!this.result || <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>role</th>
                    </tr>

                    {users.map(user => {
                        return <tr key={user.id} id={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><MDBBtn onClick={this.Editeuser(user.id)} color='info'>Edite</MDBBtn>
                                <MDBBtn onClick={this.deleteuser} color='danger'>delete</MDBBtn></td>
                        </tr>
                    })}
                </tbody>
            </table>}
        </>
    }


    render() {
        const { errors } = this.state;

        return (
            <div className="container AddnewUser">
                <h2 style={{ padding: '10px' }}>Registration</h2>
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
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={this.handleInputChange}
                            value={this.state.password_confirm}
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        {/* <input
                            type="text"
                            placeholder="Role"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.role
                            })}
                            name="role"
                            onChange={this.handleInputChange}
                            value={this.state.role}
                        /> */}
                        <select name="role" id="role" className="form-control" onChange={this.handleInputChange}>

                            <option value='notdefine'>choose role</option>
                            <option value='student'>student</option>
                            <option value='teacher'>teacher</option>
                            <option value='admin'>admin</option>

                        </select>
                        {errors.role && (<div className="invalid-feedback">{errors.role}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register User
                    </button>
                    </div>

                </form>
                <div>
                    {this.createUserAdded()}
                </div>
            </div>
        )
    }
}

AddNewUser.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    courseStatus: state.courseStatus
});

export default connect(mapStateToProps, { registerUser })(withRouter(AddNewUser))