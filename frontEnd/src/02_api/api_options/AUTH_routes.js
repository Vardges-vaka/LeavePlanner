



const AUTH_routes = {
  SIGNIN: {
    ENDPOINT: `${BACKEND_URL}/api/user/auth/signin`,
    DISPLAY_NAME: "AdminSignIn_helper.js",
    PROPERTIES: (payload) => {
      return {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
    },
  },
};

export default AUTH_routes;
