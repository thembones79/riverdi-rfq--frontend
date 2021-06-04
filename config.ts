export const ROOT_URL =
  process.env.NODE_ENV === "production"
    ? "https://riverdi-test.herokuapp.com/api/v1"
    : "http://localhost:3090/api/v1";
