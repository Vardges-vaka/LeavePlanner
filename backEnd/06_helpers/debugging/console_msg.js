export const Valid_msg = ["start", "end", "error_E", "success", "data"];
export const debug_msg = {
  start: "start",
  end: "end",
  error_E: "error_E",
  success: "success",
  data: "data",
};
export const Valid_type = ["srv", "cntrl", "vld", "mw"];

const error_logs = (error) => {
  if (!error) return "No error provided";
  const error_message = error ? error.message : "No error message";
  const error_stack = error ? error.stack : "No error stack";
  const error_name = error ? error.name : "No error name";
  const error_code = error ? error.code : "No error code";
  const error_status = error ? error.status : "No error status";
  const error_status_code = error ? error.status_code : "No error status code";
  const error_status_message = error
    ? error.status_message
    : "No error status message";
  return `error_message ==> | ${error_message} | error_stack ==> | ${error_stack} | error_name ==> | ${error_name} | error_code ==> | ${error_code} | error_status ==> | ${error_status} | error_status_code ==> | ${error_status_code} | error_status_message ==> | ${error_status_message} <==`;
};
export const cntrl_logs = (msg, error) => {
  const start = "🚩 | [STARTED] | ";
  const end = "🏁 | [FINALLY] | ";
  const error_E = `🛑☢️☠️☣️🚨😱 | [EXCEPTION ERROR] | ${error_logs(error)}`;
  const success = "✅ | [SUCCESS] | ";
  const data = "📶 | [SUCCESS] | ";
  switch (msg) {
    case "start":
      return start;
    case "end":
      return end;
    case "error_E":
      return error_E;

    case "success":
      return success;
    case "data":
      return data;
    default:
      return console.error("Invalid message | cntrl_logs.js");
  }
};
export const srv_logs = (msg, error) => {
  const start = "🚩 | [STARTED] | ";
  const end = "🏁 | [FINALLY] | ";
  const error_E = `🛑☢️☠️☣️🚨😱 | [EXCEPTION ERROR] | ${error_logs(error)}`;
  const success = "✅ | [SUCCESS] | ";
  const data = "📶 | [SUCCESS] | ";
  switch (msg) {
    case "start":
      return start;
    case "end":
      return end;
    case "error_E":
      return error_E;
    case "success":
      return success;
    case "data":
      return data;
    default:
      return console.error("Invalid message | srv_logs.js");
  }
};
export const vld_logs = (msg, error) => {
  const start = "🚩 | [STARTED] | ";
  const end = "🏁 | [FINALLY] | ";
  const error_E = `🛑☢️☠️☣️🚨😱 | [EXCEPTION ERROR] | ${error_logs(error)}`;
  const success = "✅ | [SUCCESS] | ";
  const data = "📶 | [SUCCESS] | ";
  switch (msg) {
    case "start":
      return start;
    case "end":
      return end;
    case "error_E":
      return error_E;
    case "success":
      return success;
    case "data":
      return data;
    default:
      return console.error("Invalid message | vld_logs.js");
  }
};
export const mw_logs = (msg, error) => {
  const start = "🚩 | [STARTED] | ";
  const end = "🏁 | [FINALLY] | ";
  const error_E = `🛑☢️☠️☣️🚨😱 | [EXCEPTION ERROR] | ${error_logs(error)}`;
  const success = "✅ | [SUCCESS] | ";
  const data = "📶 | [SUCCESS] | ";
  switch (msg) {
    case "start":
      return start;
    case "end":
      return end;
    case "error_E":
      return error_E;
    case "success":
      return success;
    case "data":
      return data;
    default:
      return console.error("Invalid message | mw_logs.js");
  }
};

export const console_msg = (type, msg, error) => {
  switch (type) {
    case "cntrl":
      return error ? () => cntrl_logs(msg, error) : () => cntrl_logs(msg);
    case "srv":
      return error ? () => srv_logs(msg, error) : () => srv_logs(msg);
    case "vld":
      return error ? () => vld_logs(msg, error) : () => vld_logs(msg);
    case "mw":
      return error ? () => mw_logs(msg, error) : () => mw_logs(msg);
    default:
      return () => console.error("Invalid type | console_msg.js");
  }
};
