import { NextApiRequest, NextApiResponse } from "next";
import Cryptr from "cryptr";
const cryptr = new Cryptr(
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "defaultKey"
);
import JTW from "jsonwebtoken";

const dummyUserData = [
  {
    userName: "John Doe",
    role: "admin",
    email: "admin@gmail.com",
    password: "password123",
    phone: "1236541789",
  },
  {
    userName: "Jack Smith",
    role: "employee",
    email: "jack@gmail.com",
    password: "password123",
    phone: "1236541789",
  },
];

// using SetTimeout to simulate network delay for demo purposes...

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed", status: "Error" });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", status: "Error" });
    }
    const decryptedPassword = cryptr.decrypt(password);
    if (!decryptedPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password decryption", status: "Error" });
    }
    const filterUser = dummyUserData.find(
      (user) => user.email === email && user.password === decryptedPassword
    );
    if (!filterUser) {
      setTimeout(() => {
        return res
          .status(401)
          .json({ message: "Invalid email or password", status: "Error" });
      }, 1000);
    }
    // generate a dummy JWT token for demo purposes...
    const token = JTW.sign(
      { email: filterUser?.email || "", role: filterUser?.role },
      process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "defaultKey",
      { expiresIn: "1d" }
    );
    setTimeout(() => {
      return res.status(200).json({
        message: "Login successful",
        userData: {
          userName: filterUser?.userName,
          role: filterUser?.role,
        },
        token: token,
        status: "Success",
      });
    }, 1000);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handleLogin;
