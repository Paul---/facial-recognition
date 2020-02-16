import React, { useState } from "react";
import BannerMessage from "../BannerMessage/BannerMessage";

const SignInForm = ({ handleRouteChange, loadUserData }) => {
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const baseUrl = `https://young-brushlands-14538.herokuapp.com/`;
  const [loginError, changeLoginError] = useState(false);
  const [wrongCredentials, changeWrongCredentials] = useState(false);

  const onEmailChange = e => {
    changeEmail(e.target.value);
  };

  const onPasswordChange = e => {
    changePassword(e.target.value);
  };

  const onSubmit = () => {
    if (!email) {
      changeLoginError(true);
      changeWrongCredentials(false);
      return;
    }
    fetch(`${baseUrl}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email })
    })
      .then(res => res.json())
      .then(userData => {
        if (userData !== `Error Logging In`) {
          loadUserData(userData);
          handleRouteChange("home");
          changeLoginError(false);
        }
      })
      .catch(e => {
        changeLoginError(true);
      });
    setTimeout(() => {
      changeLoginError(false);
      changeWrongCredentials(true);
    }, 2000);
  };

  return (
    <>
      <BannerMessage message={`Welcome to My Facial Recognition Game`} />
      {loginError ? (
        <BannerMessage message={`Please Sign In or Register to Continue`} />
      ) : null}
      {wrongCredentials ? (
        <BannerMessage message={`Please Check Your Login Credentials`} />
      ) : null}
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onChange={onEmailChange}
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
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      onSubmit(e);
                    }
                  }}
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <input
                onClick={() => handleRouteChange("register")}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    </>
  );
};

export default SignInForm;
