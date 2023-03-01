import React, { useEffect } from "react";
import { getAllUsers, getUser } from "../../api_helper/request";
import { UserContext } from "../../App";
import { helpers } from "../../function_helpers";

export const Table = () => {
  const userContext = React.useContext(UserContext);

  const user = userContext.user;

  const [users, setUsers] = React.useState([]);
  const [userSort, setUserSort] = React.useState([]);

  const getUserList = async () => {
    const response = await getAllUsers();
    const { data } = response;
    const users = data?.users;
    console.log("users", users);
    setUsers(users);
  };
  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const sortedUsers = helpers.getBestTenScore(users);
      setUserSort(sortedUsers);
    }
  }, [users, user]);

  useEffect(() => {
    if (user) {
      const _users = users.map((user) => {
        if (user.id === userContext.user.id) {
          return userContext.user;
        }
        return user;
      });
      setUsers(_users);
    }
  }, [user]);

  return (
    <div className="table__container">
      <table
        className="table"
        aria-label="Table des scores"
        id="table"
        style={{ backgroundColor: "blue", color: "white" }}
      >
        <thead className="table__header">
          <tr>
            <th scope="col">Rang</th>
            <th scope="col">Joueur</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {userSort.map((user, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  user.id === userContext.user.id ? "red" : "blue",
              }}
            >
              <td>{index + 1}</td>
              <td>{user.id === userContext.user.id ? "Vous" : user.pseudo}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
