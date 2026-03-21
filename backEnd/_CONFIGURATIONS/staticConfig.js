import express, { Router } from "express";

const staticConfig = () => {
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

export { staticConfig };
