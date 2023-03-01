import client from "./client";

export const login = async (data) =>
  new Promise((resolve, reject) => {
    client
      .post("users", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const newScore = (userId, data) =>
  new Promise((resolve, reject) => {
    client
      .put("users/" + userId, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getUser = (userId) =>
  new Promise((resolve, reject) => {
    client
      .get("users/" + userId)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getAllUsers = () =>
  new Promise((resolve, reject) => {
    client
      .get("users")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
