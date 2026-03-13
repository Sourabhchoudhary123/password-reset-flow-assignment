import express from "express";

import {
 register,
 login,
 forgotPassword,
 resetPassword,
 registers,
 getUsers
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register",register);

router.post("/login",login);

router.post("/forgot-password",forgotPassword);

router.post("/reset-password/:token",resetPassword);

router.post("/registernew",registers)

// Show User//

router.get("/users", getUsers);

export default router;