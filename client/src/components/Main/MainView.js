import React, { Component } from 'react';
import "./MainView.css"

class MainView extends Component {

    buttonsDiv = () => {
        return (
            <div className="authbuttons">
                <div className="btnIntro">
                    Please login or register if you are here for the first time
                </div>
                <button className="btn" onClick={ e => window.setTimeout(() => {
                    this.props.history.push(`/login`)}, 500) }>Login</button>

                <button className="btn" onClick={ e => window.setTimeout(() => {
                    this.props.history.push(`/registration`)}, 500) }>Register</button>
            </div>
        );
    }

    introDiv = () => {
        return (
                    <div className="introdiv">
                       Welcome to our chat!
                    </div>
        );
    }

    render() {
        return (
            <div className="Fon" >
                <this.introDiv />
                <this.buttonsDiv />
            </div>
        );
    }
};

export default MainView;
