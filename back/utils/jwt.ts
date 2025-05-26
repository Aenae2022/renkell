import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_insecure"; // Remplace en prod

export function generateToken(userId: number): string {
  const payload = {
    id: userId,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}
