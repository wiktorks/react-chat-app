import React, { Component } from 'react';
import './Registration.css';
import { authService } from "./AuthenticationService";
import { withRouter } from "react-router-dom";


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.state.confirmPassword !== this.state.password) {
            alert('Password and confirmation have to be equal!');
            return;
        }

        let addUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        const response = await authService.register(addUser);
        if(response.success === false)
            alert(`Registration error!`);
        else {
            alert(`User ${this.state.name} successfully registered`);
            this.props.history.push('/login');
        }

    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }
    handleNameChange(event) {
        this.setState({name: event.target.value})
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }
    handleConfirmPasswordChange(event) {
        this.setState({confirmPassword: event.target.value})
    }


    render() {
        return (
            <div className="RegistrationView">
                <div className='Fon'>
                    <div className="RegContainer">
                        <h1>Registration</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text" pattern="[a-zA-Z0-9]+"
                                title="USE ONLY LETTERS AND NUMBERS PLEASE"
                                placeholder="Login"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                required
                            />
                            <input
                                type="text" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+"
                                title="ENTER A VALID Email ADDRESS. example@example.com"
                                placeholder="E-mail"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                required
                            />
                            <input
                                type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
                                title="Your password must be at least 5 characters as well as contain at least one
                                uppercase, one lowercase, and one number."
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                required
                            />
                            <input
                                type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
                                title="Your password must be at least 5 characters as well as contain at least one
                                uppercase, one lowercase, and one number."
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                onChange={this.handleConfirmPasswordChange}
                                required
                            />
                            <input type="submit" value="Register me!" />
                        </form>
                </div>
            </div>
        </div>
    );
    }
}
export default withRouter(Registration);


