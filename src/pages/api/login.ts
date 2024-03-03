import User from "../../../models/User";
import connectDB from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req: any, res: any) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    console.log("user--", req.body);
    const bytes = CryptoJS.AES.decrypt(user.password, "hydra");
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log("log--", decryptedData);

    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedData) {
        let token = jwt.sign({ name: user.name, email: user.email }, "secret", {
          expiresIn: "2d",
        });
        // console.log(token);
        res.status(200).json({ success: true, token });
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentails" });
      }
    }
  } else {
    res.status(200).json({ success: false, error: "No User Found" });
  }
};

export default connectDB(handler);
