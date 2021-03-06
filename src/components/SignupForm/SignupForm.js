import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    };

    handleChange = (e) => {
        this.props.updateMessage('');
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signup(this.state);
            this.props.handleSignupOrLogin();
            this.props.history.push('/dashboard');
        } catch (err) {
            this.props.updateMessage(err.message);
        }
    }

    isFormInvalid() {
        return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
    }

    render() {
        return (
            <div className="container">
                <div className="card card-signin my-5 card-signin-signup">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign Up</h5>
                        <form
                            className="form-horizontal"
                            onSubmit={this.handleSubmit} >
                            <div className="form-group">
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-12">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleChange} />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> 
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-12">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-12">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={this.state.passwordConf}
                                        name="passwordConf"
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-label-group">
                                <div className="col-sm-12 text-center">
                                    <button
                                    className="btn btn-lg btn-success btn-block text-uppercase"
                                        disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                        <Link to='/'>Cancel</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupForm; 