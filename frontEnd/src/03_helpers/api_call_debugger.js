const validOperations = [
  "start",
  "start_payload",
  "start_path",
  "response",
  "response_json",
  "error",
  "end",
];

const apiDebugger = (displayName, isDebug, path, data, operation) => {
  if (!isDebug) return;
  if (!displayName) {
    console.error(
      `${displayName} is [INVALID DISPLAY NAME] | displayName is missing!`,
    );
    return;
  }
  if (!operation) {
    console.error(
      `${displayName} is [INVALID OPERATION] | operation is missing!`,
    );
    return;
  }
  if (!validOperations.includes(operation)) {
    console.error(
      `${displayName} is [INVALID DEBUGGER OPERATION] | operation: [${operation}]`,
    );
    return;
  }
  if (
    [
      "start_payload",
      "start_path",
      "response",
      "response_json",
      "error",
    ].includes(operation) &&
    !data
  ) {
    console.error(`${displayName} is [INVALID DATA] | data is missing!`);
    return;
  }
  const startMessage = `${displayName} is `;

  switch (operation) {
    case "start":
      console.log(`${startMessage}[STARTED]`);
      break;
    case "start_payload":
      console.log(`${startMessage}[STARTED ==> PAYLOAD]`, data);
      break;
    case "start_path":
      console.log(`${startMessage}[STARTED ==> PATH] | [${data.path}]`);
      break;
    case "response":
      console.log(`${startMessage}[RESPONSE]`, data);
      break;
    case "response_json":
      console.log(`${startMessage}[RESPONSE ==> JSON]`, data);
      break;
    case "error":
      console.error(`${startMessage}[CATCH ==> ERROR]`, data);
      break;
    case "end":
      console.log(`${startMessage}[FINALLY ==> END]`);
      break;
  }
};

export default apiDebugger;
