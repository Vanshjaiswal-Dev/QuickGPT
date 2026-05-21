import { z } from "zod";

/**
 * Middleware to validate incoming request body/params/query against a Zod schema.
 * @param {z.ZodSchema} schema The Zod schema to validate against
 */
export const validate = (schema) => async (req, res, next) => {
  try {
    // We can parse body, query, and params. Often we just want body.
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format Zod errors into a readable structure
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
