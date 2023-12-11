const { verifyToken } = require("../../utils/jwt");
const User = require("../models/user.models");

const isAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(400).json({ message: "No autorizado" });
    }
    const token = auth.split(" ")[1];
    const tokenVerified = verifyToken(token);

    if (!tokenVerified.id) {
      return res
        .status(400)
        .json({ message: "No autorizado", message: tokenVerified });
    }

    const userProfile = await User.findById(tokenVerified);

    req.userProfile = userProfile;
    next();
  } catch (error) {}
};

module.exports = { isAuth };
