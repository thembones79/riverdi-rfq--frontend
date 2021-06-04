import React, { useState, useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { by } from "../../utils/by";

export interface IUser {
  id: number;
  email: string;
  username: string;
}

type ColumnType = keyof IUser;
type OrderType = "asc" | "desc";

const UsersTable = () => {
  const [usersTable, setUsersTable] = useState<IUser[]>([]);
  const [completeUsersList, setCompleteUsersList] = useState<IUser[]>([]);
  const [sortingOrder, setSortingOrder] = useState<OrderType>("asc");
  const [sortingColumn, setSortingColumn] = useState<ColumnType>("id");
  const [idFilter, setIdFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const { doRequest, errorsJSX } = useRequest({
    url: "/users",
    method: "get",
    onSuccess: (users: IUser[]) => fetchUsers(users),
  });

  const fetchUsers = (users: IUser[]) => {
    setCompleteUsersList(users);
    setUsersTable(users);
  };

  const renderArrows = (column: ColumnType) => {
    if (sortingColumn === column) {
      if (sortingOrder === "asc") {
        return " ↑";
      } else return " ↓";
    }
    return "";
  };

  const sortTableBy = (column: ColumnType) => {
    let order = sortingOrder;

    if (column === sortingColumn) {
      if (order === "asc") {
        order = "desc";
        setSortingOrder("desc");
      } else {
        order = "asc";
        setSortingOrder("asc");
      }
    } else {
      setSortingOrder("asc");
      order = "asc";
      setSortingColumn(column);
    }

    setUsersTable(usersTable.sort(by(column, order)));
  };

  const filterItems = (
    idText: string,
    usernameText: string,
    emailText: string
  ) => {
    const filteredItems = getFilteredItemsForText(
      idText,
      "id",
      usernameText,
      "username",
      emailText,
      "email"
    );
    setUsersTable(filteredItems);
  };

  const getFilteredItemsForText = (
    idText: string,
    idColumn: ColumnType,
    usernameText: string,
    usernameColumn: ColumnType,
    emailText: string,
    emailColumn: ColumnType
  ) => {
    if (completeUsersList) {
      return completeUsersList.filter((item) => {
        if (item[idColumn] && item[usernameColumn] && item[emailColumn]) {
          return (
            item[idColumn]
              .toString()
              .toLowerCase()
              .includes(idText.toLowerCase()) &&
            item[usernameColumn]
              .toString()
              .toLowerCase()
              .includes(usernameText.toLowerCase()) &&
            item[emailColumn]
              .toString()
              .toLowerCase()
              .includes(emailText.toLowerCase())
          );
        } else {
          return false;
        }
      });
    } else {
      return [];
    }
  };
  const onIdFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIdFilter(e ? e.currentTarget.value : "");
    filterItems(e ? e.currentTarget.value : "", usernameFilter, emailFilter);
  };

  const onUsernameFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsernameFilter(e ? e.currentTarget.value : "");
    filterItems(idFilter, e ? e.currentTarget.value : "", emailFilter);
  };

  const onEmailFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailFilter(e ? e.currentTarget.value : "");
    filterItems(idFilter, usernameFilter, e ? e.currentTarget.value : "");
  };

  const renderTableHeader = () => {
    if (usersTable.length > 0) {
      const columns = ["id", "username", "email"] as ColumnType[];
      return columns.map((column) => {
        return (
          <th key={column} onClick={() => sortTableBy(column)}>
            {column + renderArrows(column)}
          </th>
        );
      });
    }
  };

  const renderTableBody = () => {
    return usersTable.map((user) => {
      const { username, email, id } = user;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{username}</td>
          <td>{email}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="table-container">
      <table className="table is-striped is-narrow is-hoverable is-fullwidth ">
        <thead>
          <tr>
            <th>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={idFilter}
                onChange={(e) => {
                  onIdFilterChange(e);
                }}
              />
            </th>
            <td>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={usernameFilter}
                onChange={(e) => {
                  onUsernameFilterChange(e);
                }}
              />
            </td>
            <th>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={emailFilter}
                onChange={(e) => {
                  onEmailFilterChange(e);
                }}
              />
            </th>
          </tr>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody className="fixed200 ">{renderTableBody()}</tbody>
      </table>
      {errorsJSX()}
    </div>
  );
};

export default UsersTable;
