import User from "../models/user.model.js";

export default async function createUser({ email, username, password }) {
  if (!email || !username || !password) {
    throw new Error("All fields are required");
  }
  const user = await User.create({ email, username, password });
  return user;
};
