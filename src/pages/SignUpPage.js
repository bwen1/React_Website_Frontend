import React, { useState } from 'react';

const SignUpPage = (props) => {
    const [email, setEmail] = useState(''); // State of email input box
    const [password, setPassword] = useState(''); // State of password input box

    // Change contents of email input box
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    // Change contents of password input box
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    // Onclick sign up button
    const handleClickSignup = () => {
        //  signUpMessage = 'That email is already registered, please login';
        fetch('https://cab230.hackhouse.sh/register', {
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
                throw new Error('Network response was not ok');
            })
            .then((result) => {
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
            })
            // Password must be at least 5 characters long, email must be at least 5 characters long
            .catch((error) => {
                if (password.length < 5) {
                    alert(
                        'Your password must be at least 5 characters long. ',
                        error.message
                    );
                } else if (email.length > 5) {
                    alert(
                        'This email is already registered, please login. ',
                        error.message
                    );
                } else {
                    alert('Please enter your email. ', error.message);
                }

                console.log(
                    'There has been a problem with your fetch operation: ',
                    error.message
                );
            });
    };

    // Onclick Login button
    const handleClickLogin = () => {
        props.changePage('Login'); // Change page to Login page
    };

    return (
        <div className="LoginPage">
            <h1 align="center">Register Account</h1>
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
            <div align="center" />
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
                <button className="LoginButton" onClick={handleClickSignup}>
                    Register
                </button>
                <br />
                <button className="SignUpButton" onClick={handleClickLogin}>
                    I Have An Account
                </button>
                <p className="text">{/*`Message: `*/}</p>
            </div>
        </div>
    );
};

export default SignUpPage;
