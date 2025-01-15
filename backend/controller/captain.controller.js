import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";

// controller for captain registration
const captainRegister = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password, color, plate, vehicleType, capacity } = req.body;

  const hashedPassword = await Captain.hashPassword(password);

  try {
    const captain = await createCaptain({
      email,
      name,
      password: hashedPassword,
      color,
      plate,
      vehicleType,
      capacity
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

  } catch (error) {

    res.status(500).json({error:error.message})

  }
};

export { captainRegister };
