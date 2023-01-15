export const API_HOST = ((): string => {
  switch (process.env.REACT_APP_ENV) {
    case "local":
      return "http://localhost:3000";
    default:
      return "https://api.best-10.co.in";
  }
})();