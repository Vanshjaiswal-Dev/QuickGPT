import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// Generate JWT for OAuth users
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// @desc    Auth with Google
// @route   GET /api/auth/google
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    // Successful authentication
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token in URL (frontend will extract it and save to local storage/Zustand)
    // Adjust the redirect URL based on your frontend port
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    res.redirect(`${clientUrl}/login?token=${token}`);
  }
);

export default authRouter;
