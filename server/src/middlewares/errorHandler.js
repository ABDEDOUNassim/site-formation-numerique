import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export function notFound(req, res) {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Route introuvable" }
  });
}

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Données invalides",
        details: err.flatten()
      }
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: "API_ERROR",
        message: err.message,
        details: err.details
      }
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Une erreur inattendue est survenue"
    }
  });
}
