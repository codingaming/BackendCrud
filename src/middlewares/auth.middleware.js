import { body, validationResult } from "express-validator";
import { CONFIG } from "../config.js";

export async function validateSignUp(req, res, next) {
  await body("username")
    .notEmpty()
    .withMessage("username is required")
    .run(req);
  await body("firstName")
    .notEmpty()
    .withMessage("firstName is required")
    .run(req);
  await body("lastName")
    .notEmpty()
    .withMessage("lastName is required")
    .run(req);
  await body("email").isEmail().withMessage("email is required").run(req);
  await body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long")
    .run(req);

  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      errors: validationResult(req).array(),
    });
  }
  return next();
}

export async function validateSignIn(req, res, next) {
  await body("username")
    .notEmpty()
    .withMessage("username is required")
    .run(req);
  await body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long")
    .run(req);

  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      errors: validationResult(req).array(),
    });
  }
  return next();
}

export const tokenRequired = (req, res, next) => {
  const token = req.headers["Authorization"] || "";
  if (!token) return res.status(401).json({ message: "Token required" });
  const clearToken = token.slice(7);

  try {
    const authenticatedUser = jwt.verify(clearToken, CONFIG.jwt.key);
    req.user = authenticatedUser;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
  return next();
};
