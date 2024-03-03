import User from "../../../models/User";
import connectDB from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req: any, res: any) => {
  if (req.method == "POST") {
    console.log(req.body);

    const { name, email } = req.body;
    let u = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, "hydra").toString(),
    });

    await u.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
