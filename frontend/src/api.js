import axios from "axios";

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:4000/api";

export default instance = axios.create({ baseURL: API_ROOT });

// instance.get('/hi').then((data) => console.log(data));
