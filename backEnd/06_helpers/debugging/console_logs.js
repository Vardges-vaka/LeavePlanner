import { Valid_msg, Valid_type, console_msg } from "./console_msg.js";

const console_logs = (type, displayName, isDebug, msg, error) => {
  if (isDebug === false) return;
  if (
    isDebug === undefined ||
    !type ||
    !displayName ||
    !msg ||
    !Valid_type.includes(type) ||
    !Valid_msg.includes(msg)
  ) {
    console.error("Invalid parameters | console_logs.js");
    return;
  }

  const log = console_msg(type, msg, error);

  if (isDebug) {
    error
      ? console.log(`${displayName} | ${log} | `)
      : console.log(`${log} | ${displayName} |`);
  }
};

export default console_logs;
