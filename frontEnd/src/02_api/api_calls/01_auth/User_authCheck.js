import { AUTH_routes } from "../../api_options/_api_options.index.js";
import { apiDebugger } from "../../../03_helpers/_helpers.index.js";

const displayName = AUTH_routes.authCheck.DISPLAY_NAME;
const isDebug = AUTH_routes.authCheck.isDebug;
const endpoint = AUTH_routes.authCheck.ENDPOINT;
const properties = AUTH_routes.authCheck.PROPERTIES;

const DEBUG = (data, operation) =>
  apiDebugger(displayName, isDebug, endpoint, data, operation);

const User_authCheck = async (payload, tCommon) => {
  DEBUG(null, "start");
  DEBUG("start_path");
  DEBUG(payload, "start_payload");

  try {
    const response = await fetch(endpoint, { ...properties(payload) });

    DEBUG(response, "response");

    const backendResponse = await response.json();

    DEBUG(backendResponse, "response_json");

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || tCommon("API.success"),
      data: backendResponse.data || null,
    };
  } catch (error) {
    DEBUG(error, "error");
    return {
      success: false,
      message: error.message || tCommon("API.globalError"),
    };
  } finally {
    DEBUG(null, "end");
  }
};

export default User_authCheck;
