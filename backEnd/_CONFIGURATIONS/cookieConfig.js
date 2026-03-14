import express from "express";

const cookieConfig = () => {
  return (
    "/static",
    express.static("public", {
      maxAge: "7d",
      immutable: true,
    })
  );
};

export { cookieConfig };
