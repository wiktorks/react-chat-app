import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { authService } from "./AuthenticationService";
import "./Login.css";
// import { withRouter } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            submitted: false,
            redirect: false
        };
    }

    redirectToMainPage = () => {
        this.setState({redirect: true});
    }

    componentDidMount() {
        if(authService.isAuthenticated()) {
            this.redirectToMainPage();
        }
    }

    loginHandler = async event => {
        const { name, password } = this.state;

        event.preventDefault();
        this.setState({ submitted: true });

        if (!(name && password)) return;

        const response = await authService.login(name, password);
        if(response.success) {
            const user = {
                id: response.userId,
                name: response.name,
                email: response.email,
                token: response.token
            }
            authService.authenticateUser(user);
            this.redirectToMainPage();
        } else {
            if(response.status === '404') {
                alert('Page not found');
            } else {
                alert('Wrong credentials');
            }
        }

    };

    changeHandler = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { name, password, submitted, redirect } = this.state;

        if(redirect) {
            return (<Redirect to='/signedin' />);
        }

        return (
            <div className="Fon">
            <div className="loginContainer">

                <h1>Sign in</h1>
                <form onSubmit={this.loginHandler}>
                    <div
                        className={
                            "input-wrapper" +
                            (submitted && !name ? " error-submit" : "")
                        }
                    >
                        <input
                            type="text"
                            name="name"
                            onChange={this.changeHandler}
                            placeholder="Login"
                            required
                        />
                        <p
                            className={
                                "error-message" +
                                (submitted && !name ? " error-submit" : "")
                            }
                        >
                        </p>
                    </div>
                    <div
                        className={
                            "input-wrapper" +
                            (submitted && !password ? " error-submit" : "")
                        }
                    >
                        <input
                            type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
                            title="Your password must be at least 5 characters as well as contain at least one
                                uppercase, one lowercase, and one number."
                            name="password"
                            onChange={this.changeHandler}
                            placeholder="Password"
                            required
                        />
                        <p
                            className={
                                "error-message" +
                                (submitted && !password ? " error-submit" : "")
                            }
                        >
                        </p>
                    </div>

                    <input type="submit" value="Login"/>
                </form>
            </div>
            </div>
        );
    }
}

export default Login;
