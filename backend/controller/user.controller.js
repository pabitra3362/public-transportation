import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

// controller for userRegister
async function userRegister(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;
  const hashedPassword = await User.hashPassword(password);

  try {
    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in userRegister controller: ", err.message);
  }
}

// controller for userLogin
async function userLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400), json({ errors: errors.array() });
  }

  const { email, password } = req.body;
}

export { userRegister };
