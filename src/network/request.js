import axios from "axios";

const isHandlerEnabled = (config = { handlerEnabled: true }) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = (request) => {
  console.log(request);
  if (isHandlerEnabled(request)) {
    const token =
      "Mg.CNVgnVIOp38vqRHnRmp7om-faa1ZPmxfbuZKFMzaj-NHwsi6F327K3LqoSAf";
    // localStorage.getItem('token') || undefined

    if (token != null && typeof token !== "undefined") {
      console.log(token);
      request.headers.Authorization = `Bearer ${token}`;
    }
  }

  return request;
};

const errorHandler = (error) => {
  console.log(error?.response);

  if (error?.response?.status === 401) {
    // unauthorized
    localStorage.clear();
    window.location.reload();
  }

  if (error?.response?.status === 422) {
    // unprocessable entity
    console.log(error.response);

    return Promise.reject({
      message:
        error?.response?.data?.errors
          ?.map((e) => `${e.field} - ${e.message}`)
          .join("\n") ?? "Please contact customer support",
    });
  }

  if (isHandlerEnabled(error.config)) {
    // Handle errors
    return Promise.reject({
      message:
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.response?.data?.code ??
        "Please try again later",
    });
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }

  return response;
};

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
client.interceptors.request.use((request) => requestHandler(request));
client.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default client;
