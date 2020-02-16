import React, { useState } from "react";
import BannerMessage from '../BannerMessage/BannerMessage';

const Register = ({ handleRouteChange }) => {
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [name, changeName] = useState("");
  const [registrationErr, changeRegistrationErr] = useState(false);
  
  const baseUrl = `https://young-brushlands-14538.herokuapp.com/`;


  const onEmailChange = e => {
    changeEmail(e.target.value);
  };

  const onPasswordChange = e => {
    changePassword(e.target.value);
  };

  const onNameChange = e => {
    changeName(e.target.value);
  };

  const onSubmit = () => {
    if (!email || !password || !email.includes('@')) {
      changeRegistrationErr(true);
      return;
    }
    fetch(`${baseUrl}register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email, name })
    })
      .then(response => response.json())
      .then(handleRouteChange("signin"))
      .catch(e => console.log(e));
  };

  const onCancel = () => {
    handleRouteChange("signin");
  }

  return (
    <>
      {registrationErr ? (
        <BannerMessage message={`Please Enter Valid Information`} />
      ) : null}
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onChange={onNameChange}
                  placeholder={`*optional`}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onChange={onEmailChange}
                  placeholder={`*required`}
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onChange={onPasswordChange}
                  placeholder={`*required`}
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="mv2">
              <input
                onClick={onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w4"
                type="submit"
                value="Register"
              />
            </div>
            <div className="mv2">
              <input
                onClick={onCancel}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w4"
                type="submit"
                value="Cancel"
              />
            </div>
          </div>
        </main>
      </article>
    </>
  );
};

export default Register;
