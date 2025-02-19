import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { encodeJWT } from "../../services/jwt/jwt.helper";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await encodeJWT(user);

    res.cookie("auth_token", token, {
      secure: false,
      httpOnly: true,
      maxAge: 36000000,
    });
    res.status(200).json({
      message: "Bienvenue sur Intra_Sense !",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      res.status(403).json({ authentified: false, message: "token manquant" });
    }

    const verifiedToken = jwt.verify(
      req.cookies.auth_token,
      process.env.APP_SECRET as string,
    );
    if (verifiedToken) {
      next();
    } else {
      res.json({ authentified: false });
      return;
    }
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({ message: "Déconnexion réussie" });
};
