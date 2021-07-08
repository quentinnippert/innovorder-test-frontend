import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import loadingGIF from '../loading.gif';

import IP_DEV from '../IP.js';
import '../styles/AuthenticationStyle.css';

function Authentication(props) {

  const [username_Login, set_Username_Login] = useState('');
  const [password_Login, set_Password_Login] = useState('');

  const [email_Signup, set_Email_Signup] = useState('');
  const [username_Signup, set_Username_Signup] = useState('');
  const [password_Signup, set_Password_Signup] = useState('');

  const [error_Login, set_Error_Login] = useState('')
  const [error_Signup, set_Error_Signup] = useState('');

  const [login_Validation, set_Login_Validation] = useState(false);
  const [loading, set_Loading] = useState(false);

  const handleSignIn = async () => {
    const rawResponse = await fetch(`${IP_DEV}:3001/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${username_Login}&password=${password_Login}`
    });
    const response = await rawResponse.json();
    console.log(response, '<- - - - response on sign in');
    if (response.access_token) {
      props.onGetToken(response.access_token);
      props.onLogin(response.user._doc);
      set_Login_Validation(true);
    } else {
      set_Error_Login('Username or password incorrect.');
    }
  }

  const handleSignUp = async () => {
    set_Loading(true)
    const rawResponse = await fetch(`${IP_DEV}:3001/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${email_Signup}&username=${username_Signup}&password=${password_Signup}`
    });
    const response = await rawResponse.json();
    setTimeout(() => {
      set_Error_Signup('Your account has been created, please log in.');
      set_Loading(false)
    }, 1000);
    if (response.result === false) {
      setTimeout(() => {
        set_Loading(false);
        set_Error_Signup(response.message);
      }, 1000);
    }
  }
  if (login_Validation) {
    return (
      <Redirect to="/home" />
    )
  } else {
    return (
      <div className="authentication-container">
        <div className="sign-up-container">
          <h2 className="title-auth">
            Sign Up
        </h2>
          <input className="input-auth" onChange={e => set_Email_Signup(e.target.value)} type="email" value={email_Signup} placeholder="Email"></input>
          <input className="input-auth" onChange={e => set_Username_Signup(e.target.value)} type="text" value={username_Signup} placeholder="Username"></input>
          <input className="input-auth" onChange={e => set_Password_Signup(e.target.value)} type="password" value={password_Signup} placeholder="Password"></input>
          {loading ? <img src={loadingGIF} className="loading" /> : <button className="validation-auth" onClick={() => handleSignUp()}>Sign up</button>}
          {error_Signup !== '' ? <p className="error">{error_Signup}</p> : null}
        </div>
        <div className="sign-in-container">
          <h2 className="title-auth">
            Sign In
        </h2>
          <input className="input-auth" onChange={e => set_Username_Login(e.target.value)} type="text" value={username_Login} placeholder="Username"></input>
          <input className="input-auth" onChange={e => set_Password_Login(e.target.value)} type="password" value={password_Login} placeholder="Password"></input>
          <button className="validation-auth" onClick={() => handleSignIn()}>Sign in</button>
          {error_Login !== '' ? <p className="error">{error_Login}</p> : null}
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onGetToken: function (arg) {
      dispatch({ type: 'GET_TOKEN', payload: arg })
    },
    onLogin: function (arg) {
      dispatch({ type: 'USER_LOGIN', payload: arg })
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Authentication);
