import { loginUser } from "../../controllers/user";

export default async (req, res) => {

  try {
    const { email, password } = req.body;
    console.log("email"+email);
    console.log("password"+password);
    const { user, token } = await loginUser({ email, password });
    res.status(200).json({ user, token });
    console.log("Logged in successfully");
  } catch (error) {
    res.status(403).json({"error":"Invalid  Credentials!"});
    console.log("Invalid Credentials");
  }
};
