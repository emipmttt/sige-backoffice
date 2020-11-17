import axios from "axios";

export const apiPath = process.env.VUE_APP_API;

const config = new axios.create({
  baseURL: apiPath,
});

export default config;