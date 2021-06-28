import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { IUser } from "../users";
import { NiceButton } from "../../components/nice-button";

interface SignUpProps {
  currentUser: IUser;
}

const Signup: React.FC<SignUpProps> = ({ currentUser }) => {
  useEffect(() => {
    if (!currentUser) {
      Router.push("/");
    }
  });

  if (!currentUser) {
    return <div></div>;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [shortname, setShortname] = useState("");
  const [role_id, setRoleId] = useState(0);

  const { doRequest, errorsJSX, inputStyle } = useRequest({
    url: "/users/signup",
    method: "post",
    body: {
      email,
      password,
      passwordConfirm,
      username,
      shortname,
      role_id,
    },
    onSuccess: () => Router.push("/users"),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div>
      <div className="full-page">
        <div className="card max-w-800 m-3 big-shadow">
          <div className="card-content">
            <form onSubmit={onSubmit}>
              <h1 className="title m-3 is-4 mb-5">Add New User</h1>

              <div className="field m-3">
                <label className="label">User Name</label>
                <input
                  className={inputStyle("username")}
                  type="text"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="field m-3">
                <label className="label">Shortame</label>
                <input
                  className={inputStyle("shortname")}
                  type="text"
                  value={shortname}
                  required
                  onChange={(e) => setShortname(e.target.value)}
                />
              </div>

              <div className="field m-3">
                <label className="label">Email Address</label>
                <input
                  className={inputStyle("email")}
                  type="text"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field m-3">
                <label className="label">Password</label>
                <input
                  className={inputStyle("password")}
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="field m-3">
                <label className="label">Password Confirm</label>
                <input
                  className={inputStyle("passwordConfirm")}
                  type="password"
                  value={passwordConfirm}
                  required
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>

              <div className="field m-3">
                <label className="label">Role</label>
                <div className={`select `}>
                  <select
                    name="role_id"
                    id="role_id"
                    value={role_id}
                    required
                    onChange={(e) => {
                      setRoleId(parseInt(e.target.value));
                    }}
                  >
                    <option></option>
                    <option value={1}>admin</option>
                    <option value={2}>PM</option>
                    <option value={3}>KAM</option>
                  </select>
                </div>
              </div>

              {errorsJSX()}

              <div className="m-3 mt-6 ">
                <NiceButton>
                  <i className="far fa-check-circle"></i>
                  <span className="m-1"></span> Create User
                </NiceButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
