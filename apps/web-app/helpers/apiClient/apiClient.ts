import axios from "axios";

const isOnServerSite = typeof window === "undefined";

const baseURL = isOnServerSite ? process.env.API_BASE_URL : "/api/";

export const apiClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

function getToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsIm5iZiI6MTY5NjAyMzA2MywiZXhwIjoxNjk2MjM5MDYzfQ.6IvMLEIytRwKK3iMvmjnvg7auryYP027IqgVkjjg6so";
}
