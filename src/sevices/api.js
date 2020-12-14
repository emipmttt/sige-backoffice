import axios from "axios";

export const apiPath = "https://sige-produciendo.herokuapp.com/";

const config = new axios.create({
  baseURL: apiPath,
});

export default config;