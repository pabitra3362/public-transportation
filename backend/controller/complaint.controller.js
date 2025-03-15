import { validationResult } from "express-validator";
import {
  getPendingComplaintService,
  registerComplaintService,
  updateComplaintService,
} from "../services/complaint.service.js";

// Controller to register a complaint
export const registerComplaint = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;

  try {
    const complaint = await registerComplaintService({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for update complaint
export const updateComplaint = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { complaintId, status } = req.body;

  try {
    const complaint = await updateComplaintService({ complaintId, status });

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for fetch all complaints
export const fetchComplaints = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const complaints = await getPendingComplaintService();

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
