import axios from "axios";
import ENV from "../utils/env";

const axiosClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});
