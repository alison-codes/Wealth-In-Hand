import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import './LoginPage.css';

class LoginPage extends Component {
    state = {
        email: '',
        pw: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state);
            this.props.handleSignupOrLogin();
            this.props.history.push('/');
        } catch (err) {
            alert('Invalid Credentials. Please try again.');
            // this.props.updateMessage('Invalid Credentials');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Log In</h5>
                        <form className="form-horizontal form-signin" onSubmit={this.handleSubmit} >
                            <div className="form-group form-label-group">
                                <div className="col-sm-12">
                                    <label for="inputEmail">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group form-label-group">
                                <div className="col-sm-12">
                                    <label for="inputPassword">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.pw}
                                        name="pw"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-label-group">
                                <div className="col-sm-12 text-center">
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase">Log In</button>&nbsp;&nbsp;&nbsp;
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

export default LoginPage;