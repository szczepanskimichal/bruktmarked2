import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

/**
 * API endpoint for user registration.
 *
 * 1. Handles POST requests where user submits email and password.
 * 2. Connects to MongoDB using mongooseConnect().
 * 3. Hashes the user's password using bcrypt for secure storage.
 * 4. Saves the new user (email + hashed password) to the User collection.
 * 5. Checks for duplicate email addresses:
 *    - If the email already exists in the database, returns a 409 Conflict error.
 * 6. Provides appropriate error handling for database issues or unexpected errors.
 * 7. Sends back the created user data or an error message.
 */

export default async function handle(req, res) {
  if (req.method === "POST") {
    await mongooseConnect();
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const user = await User.create({ email, password: hashedPassword });
      res.json(user);
    } catch (error) {
      if (error.code === 11000 && error.keyValue.email) {
        res.status(409).json({ error: "Email address already exists" });
      } else {
        res.status(500).json({ error: "Unexpected error occurred" });
      }
    }
    res.json(true);
  }
}
