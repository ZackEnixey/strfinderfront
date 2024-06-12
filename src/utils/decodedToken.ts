import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: string;
}

export const getUserId = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
