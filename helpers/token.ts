var jwt = require("jsonwebtoken");

let jwt_secret=process.env.JWT_SECRET

export const createAccessToken = async (payload: any) => {
  return await jwt.sign({data: payload},jwt_secret,{ expiresIn: "1h" },{ algorithm: "RS256" });
};
export const createRefreshToken = async (payload: any) => {
  return await jwt.sign(
    {
      data: payload,
    },
     jwt_secret,
    { expiresIn: "1d" },
    { algorithm: "RS256" }
  );
};

export const verifyToken = async (token: any, secretKey: any) => {
  //   try {
  return await jwt.verify(token, secretKey);
  //   } catch (err) {
  //     throw new Error("nhh")
  //     console.log(err)
  //   }
};
