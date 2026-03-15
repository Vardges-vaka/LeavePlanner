const NODE_ENV = process.env.NODE_ENV || "development";

const corsOptions = {
  origin: "http://localhost:3330",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const SERVER_PORT = parseInt(process.env.SERVER_PORT, 10) || 5000;

export { SERVER_PORT, NODE_ENV, corsOptions };
