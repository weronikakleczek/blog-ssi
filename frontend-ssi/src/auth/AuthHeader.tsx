import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
  const jwtToken = localStorage.getItem("jwt");
  if (jwtToken == null) {
    return {};
  } else {
    return {
      Authorization: `Bearer ${jwtToken}`,
      "content-type": "application/json",
    };
  }
}
