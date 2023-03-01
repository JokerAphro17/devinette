import axios from "axios";
import { API_URL } from "./config";

const baseURL = API_URL;

const client = axios.create({
  baseURL,
});

export default client;
