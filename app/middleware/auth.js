const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify);

const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = async (req, res, next) => {
  let token;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  } else {
    token = req.body.token || req.query.token;
  }
  console.log("token:", token);
  if (!token) {
    res.status(403).json({ message: "Se necesita un token para autorizar" });
    return;
  }
  try {
    const decoded = await verify(token, TOKEN_KEY);
    console.log("decoded:", decoded);
  } catch (err) {
    res.status(401).json({ message: "Token no valido, acceso denegado" });
    console.log("error:", err);
    return;
  }
  next();
};

module.exports = verifyToken;
