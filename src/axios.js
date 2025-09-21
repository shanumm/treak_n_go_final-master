import axios from "axios";
const instance = axios.create({
  baseURL: "https://us-central1-trekngo-f4e81.cloudfunctions.net/api",
});

export default instance;
