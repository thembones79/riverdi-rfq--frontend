import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import styles from "../../styles/UsersList.module.scss";

export interface IUser {
  id: number;
  email: string;
  username: string;
}

interface UsersListProps {
  currentUser: IUser;
}

const UsersList = ({ currentUser }: UsersListProps) => {
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const { doRequest, errorsJSX } = useRequest({
    url: "/users",
    method: "get",
    onSuccess: (list: IUser[]) => setUsersList(list),
  });
  const renderUsersList = () => {
    return usersList.map((user) => {
      const { username, email, id } = user;
      return (
        <li key={email}>
          <div className={styles.usersRow}>
            <div className={styles.usersRow__item}>{username}</div>
            <button
              className="button is-link is-outlined m-3"
              onClick={() => Router.push(`/users/${id}`)}
            >
              Edit
            </button>
          </div>
        </li>
      );
    });
  };
  useEffect(() => {
    doRequest();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      Router.push("/auth/login");
    }
  });

  return currentUser ? (
    <div>
      <div className="card">
        <div className="card-content">
          <div className="title">List of Users</div>
          <div className="fixed200">
            <div> {errorsJSX()}</div>
            <ol className={styles.usersList}>{renderUsersList()}</ol>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Please Log In</div>
  );
};

export default UsersList;
