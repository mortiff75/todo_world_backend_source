import { Response } from "express";
import { verify, sign } from "jsonwebtoken";
import { Service } from "typedi";

@Service({ name: "token" })
class ReserveToken {
  private SECRET_KEY = process.env.JWT_SECRET_KEY;

  async reserve(id: string, res: Response, data: any) {
    const token = sign({ id }, this.SECRET_KEY!, { expiresIn: "10d" });

    res
      .cookie("token", token, {
        httpOnly: true, // افزایش امنیت، جلوگیری از دسترسی جاوااسکریپت
        secure: true,
        sameSite: "none",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      })
      .json({ token, data });
  }

  verify(token: string) {
    const result = verify(token, this.SECRET_KEY!);

    return result;
  }
}

export default ReserveToken;
