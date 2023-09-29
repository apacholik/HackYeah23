import axios from "axios";

const isOnServerSite = typeof window === "undefined";

const baseURL = isOnServerSite ? process.env.API_BASE_URL : "/api/";

export const apiClient = axios.create({
  baseURL,
});
