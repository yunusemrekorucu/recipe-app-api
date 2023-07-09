import express from "express";
import {
  authLogin,
  authRegister,
} from "../controllers/Auth/auth.controller.js";
const router = express.Router();

const login = () => router.route("/auth/login").post(authLogin);
const register = () => router.route("/auth/register").post(authRegister);

export { login, register };
