import React, { useState } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { Modal } from "../../components/modal";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [password, setPassword] = useState("");
  const { doRequest, errorsJSX, inputStyle } = useRequest({
    url: "/users/signup",
    method: "post",
    body: {
      email,
      password,
      username,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsModalActive(true);
  };

  const sendForm = async () => {
    await doRequest();
  };

  const modalTitle = "Are you sure you wat to do this?";

  const modalBody = () => (
    <div>
      <div>
        This action will <b>create</b> a new user!
      </div>
      <div> Are you sure you wat to do this?</div>
    </div>
  );

  const modalActionTitle = "Yes, I'm sure";

  return (
    <div>
      <div className="full-page">
        <div className="card max-w-800 m-3">
          <div className="card-content">
            <form onSubmit={onSubmit}>
              <h1 className="title m-3">Sign Up 💪</h1>

              <div className="field m-3">
                <label className="label">User Name</label>
                <input
                  className={inputStyle("username")}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

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

              <button className="button is-link  m-3">Sign Up</button>
            </form>
          </div>
        </div>
      </div>

      <Modal
        modalTitle={modalTitle}
        modalBody={modalBody()}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        modalAction={sendForm}
        modalActionTitle={modalActionTitle}
      />
    </div>
  );
};

export default Signup;
