import express from "express";
import { Router } from "express";

const cookieConfig = () => {
  const router = Router();
  router.use(
    "/static",
    express.static("public", {
      maxAge: "7d",
      immutable: true,
    }),
  );
  return router;
};

export { cookieConfig };
