import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
  iat: number;
}

const APP_SECRET = process.env.APP_SECRET;

const getTokenPayload = (token: string): TokenPayload => {
  return jwt.verify(token, APP_SECRET) as TokenPayload;
};

export const getUserId = (
  authHeader: string | undefined,
  authToken: string | null = null
): number => {
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("No token found");
    }

    const { userId } = getTokenPayload(token);
    return userId;
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
};
