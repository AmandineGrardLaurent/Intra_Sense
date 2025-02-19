import jwt from "jsonwebtoken";

export const encodeJWT = async (payload: PayloadType) => {
  const { email } = payload;

  const data = { email };

  return jwt.sign(data, process.env.APP_SECRET as string, {
    expiresIn: "24h",
  });
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
