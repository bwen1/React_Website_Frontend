import React, { useState, useEffect } from 'react';

const LoginPage = (props) => {
    const [email, setEmail] = useState(''); // State of email input box
    const [password, setPassword] = useState(''); // State of password input box

    useEffect(() => {
        // If token already exists log the user in automatically
        if (window.localStorage.getItem('token') !== null) {
            props.changePage('MainPage');
        } else {
        }
    }, [props]);

    // Change contents of email input box
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    // Change contents of password input box
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    // Onclick Login button
    const handleClickLogin = () => {
        fetch('https://cab230.hackhouse.sh/login', {
            method: 'POST',
            body: `email=${email}&password=${password}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((result) => {
                window.localStorage.setItem('token', result.token); // Store token in localStorage
                props.changePage('MainPage'); // Change to MainPage
            })
            .catch((error) => {
                alert(
                    'Your login details are incorrect, please try again. ',
                    error.message
                );
            });
    };

    // Onclick sign up button
    const handleClickSignUp = () => {
        props.changePage('SignUp'); // Change page to signup page
    };

    return (
        <div className="LoginPage">
            <h1 align="center">Queensland Offences Registry</h1>
            <div className="LoginText" align="center" />

            <div align="center">
                <input
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    style={{ fontSize: '20px' }}
                />
            </div>
            <br />
            <div className="LoginText" align="center" />

            <div align="center">
                <input
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Password"
                    style={{ fontSize: '20px' }}
                />
            </div>
            <br />
            <div align="center">
                <button className="LoginButton" onClick={handleClickLogin}>
                    Login
                </button>
                <br />
                <button className="SignUpButton" onClick={handleClickSignUp}>
                    Sign Up
                </button>
                <p className="text">
                    {/*'My current token is: ' +
                        window.localStorage.getItem('token')*/}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
