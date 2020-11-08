import axios from "axios";

export const apiPath = "http://localhost:3000";

const config = new axios.create({
  baseURL: apiPath,
});

export default config;