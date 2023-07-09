import express from "express";
import { getUsers } from "../controllers/Users/users.controller.js";
const router = express.Router();

router.route("/users").get(getUsers);

export { router };
