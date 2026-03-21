// ── Valid layer types and message codes ──
const VALID_TYPES = ["srv", "cntrl", "vld", "mw"];
const VALID_MSGS = ["start", "end", "error_E", "success", "data"];

const debug_msg = {
  start: "start",
  end: "end",
  error_E: "error_E",
  success: "success",
  data: "data",
};

// ── Label map: message code → icon + tag ──
const LABEL = {
  start: { icon: "🚩", tag: "STARTED" },
  end: { icon: "🏁", tag: "FINALLY" },
  error_E: { icon: "🛑", tag: "ERROR" },
  success: { icon: "✅", tag: "SUCCESS" },
  data: { icon: "📶", tag: "DATA" },
};

// ── Type tag for the layer ──
const TYPE_TAG = {
  srv: "SRV",
  cntrl: "CNTRL",
  vld: "VLD",
  mw: "MW",
};

export { LABEL, TYPE_TAG, debug_msg, VALID_TYPES, VALID_MSGS };
