import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "f1320a60-a0e2-472e-a08e-98a8bea5ff56",
  },
});
