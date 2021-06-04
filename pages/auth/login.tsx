import React, { useState } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errorsJSX, inputStyle } = useRequest({
    url: "/users/login",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="full-page">
      <div className="card max-w-800 m-3">
        <div className="card-content">
          <form onSubmit={onSubmit}>
            <h1 className="title m-3">Log In 🔐</h1>

            <div className="field m-3">
              <label className="label">Email Address</label>
              <input
                className={inputStyle("email")}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field m-3">
              <label className="label">Password</label>
              <input
                className={inputStyle("password")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorsJSX()}

            <button className="button is-link  m-3 ">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
