import { NextApiRequest, NextApiResponse } from "next";
import JWT from "jsonwebtoken";

interface CheckToken {
  email: string;
  role: string;
}

export const Session = async (req: NextApiRequest, res: NextApiResponse) => {
  // get the session...
  const clientToken = req?.headers.token as string;

  if (!clientToken) {
    return {
      email: null,
      role: null,
    };
  }

  const checkToken = JWT.verify(
    clientToken,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "defaultKey" as string
  ) as CheckToken;

  if (!checkToken) {
    return {
      email: null,
      role: null,
    };
  }

  const { email, role } = checkToken;
  console.log("Session info:", email, role);
  return {
    email,
    role,
  };
};
