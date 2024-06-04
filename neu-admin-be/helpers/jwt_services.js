const jwt = require("jsonwebtoken");
const RefreshTokenSchema = require("../models/refreshToken");

const signAccessToken = async (id, permission) => {
  try {
    const payload = {
      id,
      permission
    };
    const secret = process.env.ACCESS_TOKEN_KEY;
    const options = {
      expiresIn: "1h",
    };
    const accessToken = jwt.sign(payload, secret, options);
    return accessToken;
  } catch (error) {
    console.log(error, "signAccessToken error jwt_services");
  }
};

const signRefreshToken = async (id, permission) => {
  try {
    const payload = {
      id,
      permission
    };
    const secret = process.env.REFRESH_TOKEN_KEY;
    const options = {
      expiresIn: "7d",
    };
    const refreshToken = jwt.sign(payload, secret, options);
    return refreshToken;
  } catch (error) {
    console.log(error, "signRefreshToken error jwt_services");
  }
};

async function authenticateAccessToken(req, res, next) {
  try {
    // console.log(req.headers, "req.headers authenticateAccessToken")
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.json({ code: 400, message: "Authorization header required" });
    }
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.json({
            code: 2,
            message: err.message,
          });
        } else if (err.name === "TokenExpiredError") {
          // lỗi token hết hạn
          return res.json({
            code: 1,
            message: err.message,
          });
        } else {
          console.log(err);
          return res.json({
            // lỗi khác
            code: 3,
            message: err.message,
          });
        }
      }
      req.payload = payload;
      // console.log(payload, "authenticateAccessToken payload jwt_services");
      next();
    });
  } catch (error) {
    console.log(error, "authenticateAccessToken catch block error");
  }
}

async function authenticateRefreshToken(req, res, next) {
  try {
    console.log(req.body, "authenticateRefreshToken");
    const refresh_token = req.body.refresh_token;
    console.log(refresh_token, "authenticateRefreshToken refreshToken");
    if (!refresh_token) {
      return res.json({ error: true, message: "abc" });
    }
    const decodedPayload = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_KEY
    );
    const existingToken = await RefreshTokenSchema.findOne({
      token: refresh_token,
    });
    if (!existingToken) {
      return res.json({ code: 40, message: "Invalid refresh token" });
    } else {
      req.payload = decodedPayload;
    }
    next();
  } catch (err) {
    console.log(err, "authenticateRefreshToken catch block error")
    if (err.name === "JsonWebTokenError") {
      // lỗi invalid token,...
      return res.json({
        code: 20,
        message: err.message,
      });
    } else if (err.name === "TokenExpiredError") {
      // lỗi token hết hạn
      return res.json({
        code: 10,
        message: err.message,
      });
    } else {
      console.log(err);
      return res.json({
        // lỗi khác
        code: 30,
        message: err.message,
      });
    }
  }
  
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  authenticateAccessToken,
  authenticateRefreshToken,
};
