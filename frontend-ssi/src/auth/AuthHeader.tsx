

import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
  const jwtToken = localStorage.getItem("JwtToken");
  if (jwtToken == null) {
    console.log("null :(");
    return {};
  } else {
    console.log("not null (:");

    const user = JSON.parse(jwtToken);
    console.log("user:", user);

    if (user) {
      console.log("user:", user);

      return { Authorization: "Bearer " + user };
    } else {
      return {};
    }
  }
}